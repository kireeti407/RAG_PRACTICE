import { Chat } from '../../components/Chat';

export default function ChatPage() {
  return (
    <main>
      <h1>Chat</h1>
      <p className="lede">Ask a question about the documents you uploaded.</p>
      <Chat />
    </main>
  );
}
