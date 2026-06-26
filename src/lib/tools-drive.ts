import { auth } from "@/auth";

// 保存先：共有ドライブ「株式会社BAULIFE」内の社内ポータルフォルダ（= FOLDER, 旧「HOMUコラボ企画書」）
const FOLDER = process.env.DRIVE_FOLDER_ID ?? "";
const DRIVE_ID = process.env.DRIVE_ID ?? "";

// 社内ポータルのフォルダ構成
const PORTAL_NAME = "社内ポータル";        // ルート（= FOLDER を改名）
const COLLAB_FOLDER_NAME = "コラボ企画書"; // 企画書JSONの保存先サブフォルダ

const API = "https://www.googleapis.com/drive/v3";
const UPLOAD = "https://www.googleapis.com/upload/drive/v3";
const BOUNDARY = "baulifeToolsBoundary";

// ログイン中ユーザーの Google アクセストークンを取得（無ければ null）
export async function getAccessToken(): Promise<string | null> {
  const session: any = await auth();
  if (!session || session.error || !session.accessToken) return null;
  return session.accessToken as string;
}

// appProperties は 1 値あたり最大 124 バイト。日本語を考慮し短く詰める。
function clip(s: unknown, n = 30): string {
  return String(s ?? "").slice(0, n);
}

function multipartBody(metadata: object, content: unknown): string {
  return (
    `--${BOUNDARY}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    `${JSON.stringify(metadata)}\r\n` +
    `--${BOUNDARY}\r\n` +
    `Content-Type: application/json\r\n\r\n` +
    `${JSON.stringify(content)}\r\n` +
    `--${BOUNDARY}--`
  );
}

export async function listProjects(token: string) {
  // 新「コラボ企画書」サブフォルダと、旧直置き(FOLDER直下)の両方を読む（移行中も欠けない）
  const collab = await findFolder(token, COLLAB_FOLDER_NAME, FOLDER);
  const parentClause = collab
    ? `('${FOLDER}' in parents or '${collab.id}' in parents)`
    : `'${FOLDER}' in parents`;
  const params = new URLSearchParams({
    q: `${parentClause} and trashed=false and mimeType='application/json'`,
    fields: "files(id,name,modifiedTime,lastModifyingUser/displayName,appProperties)",
    orderBy: "modifiedTime desc",
    pageSize: "200",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    corpora: "drive",
    driveId: DRIVE_ID,
  });
  const res = await fetch(`${API}/files?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`list ${res.status} ${await res.text()}`);
  return (await res.json()).files ?? [];
}

export async function createProject(
  token: string,
  name: string,
  content: unknown,
  meta: { creator?: string; theme?: string }
) {
  const collabId = await ensureSubfolder(token, COLLAB_FOLDER_NAME);
  const metadata = {
    name: `${name}.json`,
    parents: [collabId],
    mimeType: "application/json",
    appProperties: { creator: clip(meta.creator), theme: clip(meta.theme) },
  };
  const res = await fetch(
    `${UPLOAD}/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,modifiedTime`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${BOUNDARY}`,
      },
      body: multipartBody(metadata, content),
    }
  );
  if (!res.ok) throw new Error(`create ${res.status} ${await res.text()}`);
  return res.json();
}

export async function readProject(token: string, id: string) {
  const res = await fetch(`${API}/files/${id}?alt=media&supportsAllDrives=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`read ${res.status} ${await res.text()}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    const e: any = new Error("PARSE");
    e.code = "PARSE";
    throw e;
  }
}

// 削除：ゴミ箱へ移動（永久削除ではなく復元可能）
export async function trashProject(token: string, id: string) {
  const res = await fetch(`${API}/files/${id}?supportsAllDrives=true&fields=id`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ trashed: true }),
  });
  if (!res.ok) throw new Error(`trash ${res.status} ${await res.text()}`);
  return res.json();
}

// 競合検知用：内容を取らずに更新時刻・更新者だけ取得
export async function getMeta(token: string, id: string) {
  const params = new URLSearchParams({
    fields: "id,modifiedTime,lastModifyingUser/displayName",
    supportsAllDrives: "true",
  });
  const res = await fetch(`${API}/files/${id}?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`meta ${res.status} ${await res.text()}`);
  return res.json();
}

export async function saveProject(
  token: string,
  id: string,
  name: string,
  content: unknown,
  meta: { creator?: string; theme?: string }
) {
  const metadata = {
    name: `${name}.json`,
    appProperties: { creator: clip(meta.creator), theme: clip(meta.theme) },
  };
  const res = await fetch(
    `${UPLOAD}/files/${id}?uploadType=multipart&supportsAllDrives=true&fields=id,modifiedTime`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${BOUNDARY}`,
      },
      body: multipartBody(metadata, content),
    }
  );
  if (!res.ok) throw new Error(`save ${res.status} ${await res.text()}`);
  return res.json();
}

// ===== WAX MIX シミュレーター：共有商品データ（単一ファイル） =====
const WAX_FOLDER_NAME = "WAXシミュレーター";
const WAX_FILE_NAME = "wax-products.json";

async function findFolder(token: string, name: string, parent: string) {
  const params = new URLSearchParams({
    q: `'${parent}' in parents and name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id,name)",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    corpora: "drive",
    driveId: DRIVE_ID,
  });
  const res = await fetch(`${API}/files?${params}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`folder list ${res.status} ${await res.text()}`);
  return (await res.json()).files?.[0] ?? null;
}

// FOLDER 直下のサブフォルダを取得（無ければ作成）
async function ensureSubfolder(token: string, name: string): Promise<string> {
  const f = await findFolder(token, name, FOLDER);
  if (f) return f.id;
  const res = await fetch(`${API}/files?supportsAllDrives=true&fields=id`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name, parents: [FOLDER], mimeType: "application/vnd.google-apps.folder" }),
  });
  if (!res.ok) throw new Error(`subfolder create ${res.status} ${await res.text()}`);
  return (await res.json()).id;
}

async function getWaxFolder(token: string): Promise<string> {
  const f = await findFolder(token, WAX_FOLDER_NAME, FOLDER);
  if (f) return f.id;
  const res = await fetch(`${API}/files?supportsAllDrives=true&fields=id`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name: WAX_FOLDER_NAME, parents: [FOLDER], mimeType: "application/vnd.google-apps.folder" }),
  });
  if (!res.ok) throw new Error(`folder create ${res.status} ${await res.text()}`);
  return (await res.json()).id;
}

async function findWaxFile(token: string, folderId: string) {
  const params = new URLSearchParams({
    q: `'${folderId}' in parents and name='${WAX_FILE_NAME}' and trashed=false`,
    fields: "files(id,name,modifiedTime,lastModifyingUser/displayName)",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    corpora: "drive",
    driveId: DRIVE_ID,
  });
  const res = await fetch(`${API}/files?${params}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`wax list ${res.status} ${await res.text()}`);
  return (await res.json()).files?.[0] ?? null;
}

export async function loadWax(token: string) {
  const folderId = await getWaxFolder(token);
  const f = await findWaxFile(token, folderId);
  if (!f) return { products: null as unknown[] | null, modifiedTime: null, by: null };
  const content: any = await readProject(token, f.id);
  return {
    products: content?.products ?? null,
    savedAt: content?.savedAt ?? 0,
    modifiedTime: f.modifiedTime ?? null,
    by: f.lastModifyingUser?.displayName ?? null,
  };
}

export async function saveWax(token: string, products: unknown[], savedAt?: number) {
  const folderId = await getWaxFolder(token);
  const f = await findWaxFile(token, folderId);
  const content = { products, savedAt: savedAt ?? Date.now() };
  if (f) {
    const res = await fetch(
      `${UPLOAD}/files/${f.id}?uploadType=multipart&supportsAllDrives=true&fields=id,modifiedTime,lastModifyingUser/displayName`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": `multipart/related; boundary=${BOUNDARY}` },
        body: multipartBody({ name: WAX_FILE_NAME }, content),
      }
    );
    if (!res.ok) throw new Error(`wax save ${res.status} ${await res.text()}`);
    return res.json();
  }
  const res = await fetch(
    `${UPLOAD}/files?uploadType=multipart&supportsAllDrives=true&fields=id,modifiedTime,lastModifyingUser/displayName`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": `multipart/related; boundary=${BOUNDARY}` },
      body: multipartBody({ name: WAX_FILE_NAME, parents: [folderId], mimeType: "application/json" }, content),
    }
  );
  if (!res.ok) throw new Error(`wax create ${res.status} ${await res.text()}`);
  return res.json();
}

// ===== 売上ランク表：記録タイムライン（チーム共有・共有ドライブの単一ファイル） =====
// wax と同じ共有ドライブ(FOLDER/DRIVE_ID)に1ファイルで保存し、チーム全員で読み書きする。
const RANK_FOLDER_NAME = "売上ランク表";
const RANK_FOLDER_OLD = "売上ランク記録"; // 旧名（移行前フォールバック）
const RANK_FILE_NAME = "rank-log.json";

// ログイン中ユーザーの表示名・メール（記録の投稿者として残す）
export async function getSessionUser(): Promise<{ email: string | null; name: string | null }> {
  const session: any = await auth();
  return { email: session?.user?.email ?? null, name: session?.user?.name ?? null };
}

async function getRankFolder(token: string): Promise<string> {
  let f = await findFolder(token, RANK_FOLDER_NAME, FOLDER);
  if (f) return f.id;
  f = await findFolder(token, RANK_FOLDER_OLD, FOLDER); // 旧名フォールバック（移行前）
  if (f) return f.id;
  return ensureSubfolder(token, RANK_FOLDER_NAME);
}

async function findRankFile(token: string, folderId: string) {
  const params = new URLSearchParams({
    q: `'${folderId}' in parents and name='${RANK_FILE_NAME}' and trashed=false`,
    fields: "files(id,modifiedTime)",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    corpora: "drive",
    driveId: DRIVE_ID,
  });
  const res = await fetch(`${API}/files?${params}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`rank list ${res.status} ${await res.text()}`);
  return (await res.json()).files?.[0] ?? null;
}

async function writeRankFile(token: string, folderId: string, file: any, entries: unknown[]) {
  const content = { entries, savedAt: Date.now() };
  if (file) {
    const res = await fetch(
      `${UPLOAD}/files/${file.id}?uploadType=multipart&supportsAllDrives=true&fields=id,modifiedTime`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": `multipart/related; boundary=${BOUNDARY}` },
        body: multipartBody({ name: RANK_FILE_NAME }, content),
      }
    );
    if (!res.ok) throw new Error(`rank save ${res.status} ${await res.text()}`);
    return res.json();
  }
  const res = await fetch(
    `${UPLOAD}/files?uploadType=multipart&supportsAllDrives=true&fields=id,modifiedTime`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": `multipart/related; boundary=${BOUNDARY}` },
      body: multipartBody({ name: RANK_FILE_NAME, parents: [folderId], mimeType: "application/json" }, content),
    }
  );
  if (!res.ok) throw new Error(`rank create ${res.status} ${await res.text()}`);
  return res.json();
}

export async function loadRankLog(token: string): Promise<{ entries: any[] }> {
  const folderId = await getRankFolder(token);
  const f = await findRankFile(token, folderId);
  if (!f) return { entries: [] };
  const content: any = await readProject(token, f.id);
  return { entries: Array.isArray(content?.entries) ? content.entries : [] };
}

// 1件追加（read-modify-write で他メンバーの記録を保持）
export async function appendRankEntry(token: string, entry: any): Promise<{ entries: any[] }> {
  const folderId = await getRankFolder(token);
  const f = await findRankFile(token, folderId);
  let entries: any[] = [];
  if (f) {
    const c: any = await readProject(token, f.id);
    entries = Array.isArray(c?.entries) ? c.entries : [];
  }
  entries.push(entry);
  await writeRankFile(token, folderId, f, entries);
  return { entries };
}

// 1件削除（投稿者本人のみ。email 不一致は FORBIDDEN）
export async function deleteRankEntry(
  token: string,
  id: string,
  email: string | null
): Promise<{ entries: any[] }> {
  const folderId = await getRankFolder(token);
  const f = await findRankFile(token, folderId);
  if (!f) return { entries: [] };
  const c: any = await readProject(token, f.id);
  let entries: any[] = Array.isArray(c?.entries) ? c.entries : [];
  const target = entries.find((e) => String(e.id) === String(id));
  if (target && target.authorEmail && email && target.authorEmail !== email) {
    const err: any = new Error("FORBIDDEN");
    err.code = "FORBIDDEN";
    throw err;
  }
  entries = entries.filter((e) => String(e.id) !== String(id));
  await writeRankFile(token, folderId, f, entries);
  return { entries };
}

// ===== ドライブ整理（社内ポータル構成へ移行・管理者用） =====
// 冪等・移動のみ・削除なし。dryRun=true なら実行せず「何を動かすか」だけ返す。

async function driveName(token: string, id: string): Promise<string> {
  const res = await fetch(`${API}/files/${id}?fields=name&supportsAllDrives=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`name ${res.status} ${await res.text()}`);
  return (await res.json()).name ?? "";
}

async function renameFile(token: string, id: string, name: string) {
  const res = await fetch(`${API}/files/${id}?supportsAllDrives=true&fields=id,name`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(`rename ${res.status} ${await res.text()}`);
  return res.json();
}

async function moveFile(token: string, id: string, addParent: string, removeParent: string) {
  const res = await fetch(
    `${API}/files/${id}?addParents=${addParent}&removeParents=${removeParent}&supportsAllDrives=true&fields=id`,
    { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`move ${res.status} ${await res.text()}`);
  return res.json();
}

// FOLDER 直下に直置きされた JSON（＝旧来の企画書）一覧
async function listLooseJson(token: string) {
  const params = new URLSearchParams({
    q: `'${FOLDER}' in parents and mimeType='application/json' and trashed=false`,
    fields: "files(id,name)",
    pageSize: "200",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    corpora: "drive",
    driveId: DRIVE_ID,
  });
  const res = await fetch(`${API}/files?${params}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`loose list ${res.status} ${await res.text()}`);
  return (await res.json()).files ?? [];
}

export async function organizeDrive(token: string, dryRun: boolean) {
  const report: any = { dryRun, root: {}, folders: {}, moved: [] as string[] };

  // 1) ルートフォルダを「社内ポータル」に改名
  const rootName = await driveName(token, FOLDER);
  report.root = {
    id: FOLDER,
    from: rootName,
    to: PORTAL_NAME,
    action: rootName === PORTAL_NAME ? "already" : dryRun ? "will-rename" : "renamed",
  };
  if (rootName !== PORTAL_NAME && !dryRun) await renameFile(token, FOLDER, PORTAL_NAME);

  // 2) 売上ランク表（旧「売上ランク記録」があれば改名）
  const rankNew = await findFolder(token, RANK_FOLDER_NAME, FOLDER);
  const rankOld = await findFolder(token, RANK_FOLDER_OLD, FOLDER);
  if (rankNew) {
    report.folders[RANK_FOLDER_NAME] = "exists";
  } else if (rankOld) {
    report.folders[RANK_FOLDER_NAME] = dryRun ? `will-rename from ${RANK_FOLDER_OLD}` : `renamed from ${RANK_FOLDER_OLD}`;
    if (!dryRun) await renameFile(token, rankOld.id, RANK_FOLDER_NAME);
  } else {
    report.folders[RANK_FOLDER_NAME] = "none-yet";
  }

  // 3) コラボ企画書フォルダを用意
  const collab = await findFolder(token, COLLAB_FOLDER_NAME, FOLDER);
  let collabId: string | null = collab?.id ?? null;
  report.folders[COLLAB_FOLDER_NAME] = collab ? "exists" : dryRun ? "will-create" : "created";
  if (!collab && !dryRun) collabId = await ensureSubfolder(token, COLLAB_FOLDER_NAME);

  // 4) WAXシミュレーターは既にサブフォルダ運用（確認のみ）
  const wax = await findFolder(token, "WAXシミュレーター", FOLDER);
  report.folders["WAXシミュレーター"] = wax ? "exists" : "none-yet";

  // 5) 直置きの企画書JSONを「コラボ企画書」へ移動
  const loose = await listLooseJson(token);
  for (const file of loose) {
    report.moved.push(file.name);
    if (!dryRun) {
      if (!collabId) collabId = await ensureSubfolder(token, COLLAB_FOLDER_NAME);
      await moveFile(token, file.id, collabId, FOLDER);
    }
  }

  return report;
}
