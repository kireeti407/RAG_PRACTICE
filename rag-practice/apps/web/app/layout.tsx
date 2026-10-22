import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'RAG Practice',
  description: 'Upload documents and ask questions over them.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <nav className="top-nav">
            <Link className="brand" href="/">
              RAG Practice
            </Link>
            <div className="nav-links">
              <Link href="/">Upload</Link>
              <Link href="/chat">Chat</Link>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
