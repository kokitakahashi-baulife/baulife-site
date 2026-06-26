import { auth } from "@/auth";

// 保存先：共有ドライブ「株式会社BAULIFE」内のフォルダ「HOMUコラボ企画書」
const FOLDER = process.env.DRIVE_FOLDER_ID ?? "";
const DRIVE_ID = process.env.DRIVE_ID ?? "";

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
  const params = new URLSearchParams({
    q: `'${FOLDER}' in parents and trashed=false and mimeType='application/json'`,
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
  const metadata = {
    name: `${name}.json`,
    parents: [FOLDER],
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
