import { Upload } from '../components/Upload';

export default function HomePage() {
  return (
    <main>
      <h1>Upload a document</h1>
      <p className="lede">
        Ingest a text file so you can ask questions about it in chat.
      </p>
      <Upload />
    </main>
  );
}
