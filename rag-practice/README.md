# RAG Practice

A monorepo for practicing Retrieval-Augmented Generation (RAG) with a Next.js web app, API backend, and Qdrant vector store.

## Project Structure

```
rag-practice/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Backend API (RAG pipeline)
├── data/
│   └── documents/    # Source documents for ingestion
└── infrastructure/
    └── qdrant/       # Qdrant vector database
```

## Getting Started

1. Copy environment variables:

   ```sh
   cp .env.example .env
   ```

2. Start Qdrant:

   ```sh
   docker compose -f infrastructure/qdrant/docker-compose.yml up -d
   ```

3. Add documents to `data/documents/` for ingestion.

## Apps

- **web** — Chat UI at `/chat`
- **api** — RAG pipeline: ingestion, embeddings, retrieval, and LLM
