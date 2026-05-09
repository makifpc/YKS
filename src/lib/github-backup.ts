export async function backupToGitHub(id: string, data: Record<string, unknown>): Promise<void> {
  try {
    await fetch('/api/backup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, data }),
    });
  } catch {
    // best-effort, ignore errors
  }
}
