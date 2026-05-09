interface BackupPayload {
  tarih?: string;
  [key: string]: unknown;
}

export async function backupCalismaToGitHub(id: string, data: BackupPayload): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) return false;

  const safeDate = typeof data.tarih === 'string' ? data.tarih : new Date().toISOString().slice(0, 10);
  const path = `backup/calismalar/${safeDate}-${id}.json`;
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

  let sha: string | undefined;
  try {
    const existingRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
      cache: 'no-store',
    });
    if (existingRes.ok) {
      const existing = await existingRes.json();
      sha = existing.sha;
    }
  } catch {
    // ignore lookup failures
  }

  const body: Record<string, unknown> = {
    message: `backup: ${id}`,
    content,
  };
  if (sha) body.sha = sha;

  const writeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return writeRes.ok;
}
