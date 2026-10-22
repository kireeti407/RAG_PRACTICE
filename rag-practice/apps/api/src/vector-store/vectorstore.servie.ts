import { Injectable } from '@nestjs/common';
import { qdrantClient } from './qdrant.client';

@Injectable()
export class QdrantService {
  private readonly collectionName =
    process.env.QDRANT_COLLECTION ?? 'rag_documents';

  async createCollection(vectorSize: number) {
    const collections = await qdrantClient.getCollections();

    const exists = collections.collections.some(
      (collection) => collection.name === this.collectionName,
    );

    if (exists) {
      return;
    }

    await qdrantClient.createCollection(this.collectionName, {
      vectors: {
        size: vectorSize,
        distance: 'Cosine',
      },
    });

    console.log(`Collection "${this.collectionName}" created`);
  }

  async storeVector(
    embeddings: number[][],
    chunks: string[],
    fileName: string,
  ) {
    if (embeddings.length === 0) {
      return {
        count: 0,
        message: 'No vectors to store',
      };
    }

    await this.createCollection(embeddings[0].length);

    await qdrantClient.upsert(this.collectionName, {
      wait: true,
      points: embeddings.map((vector, chunkIndex) => ({
        id: crypto.randomUUID(),
        vector,
        payload: {
          text: chunks[chunkIndex],
          fileName,
          chunkIndex,
        },
      })),
    });

    return {
      count: embeddings.length,
      message: 'Vectors stored successfully',
    };
  }

  async searchVector(queryVector: number[], limit = 5) {
    try {
      const result = await qdrantClient.query(this.collectionName, {
        query: queryVector,
        limit,
        with_payload: true,
      });
      return result.points;
    } catch {
      return [];
    }
  }
}
