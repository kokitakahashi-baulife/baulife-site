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
