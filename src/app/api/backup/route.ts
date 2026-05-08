import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { id, data } = await req.json();
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      return NextResponse.json({ ok: false, error: 'GitHub yapılandırılmamış' });
    }

    const path = `backup/calismalar/${data.tarih}-${id}.json`;
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

    let sha: string | undefined;
    try {
      const checkRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (checkRes.ok) {
        const existing = await checkRes.json();
        sha = existing.sha;
      }
    } catch {
      // file doesn't exist, that's fine
    }

    const body: Record<string, unknown> = {
      message: `backup: ${id}`,
      content,
    };
    if (sha) body.sha = sha;

    await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json({ ok: false });
  }
}
