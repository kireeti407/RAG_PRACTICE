'use client';

import { useState } from 'react';
import { sendMessage } from '../services/api';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || busy) return;

    setInput('');
    setError(null);
    setBusy(true);
    setMessages((prev) => [...prev, { role: 'user', content: question }]);

    try {
      const reply = await sendMessage(question);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel">
      <div className="messages">
        {messages.length === 0 ? (
          <p className="lede">No messages yet.</p>
        ) : (
          messages.map((msg, i) => (
            <p key={i} className={`bubble ${msg.role}`}>
              {msg.content}
            </p>
          ))
        )}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()}>
          {busy ? 'Sending…' : 'Send'}
        </button>
      </form>
      {error ? <p className="status err">{error}</p> : null}
    </div>
  );
}
