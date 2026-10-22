'use client';

import { useState } from 'react';
import { uploadDocument } from '../services/api';

export function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setBusy(true);
    setStatus(null);
    setError(null);

    try {
      const result = await uploadDocument(file);
      setStatus(`${result.message} (${result.count} chunks)`);
      setFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <label htmlFor="document">Document</label>
      <input
        id="document"
        type="file"
        accept=".txt,.md,.csv,.json"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button type="submit" disabled={!file || busy}>
        {busy ? 'Uploading…' : 'Upload'}
      </button>
      {status ? <p className="status ok">{status}</p> : null}
      {error ? <p className="status err">{error}</p> : null}
    </form>
  );
}
