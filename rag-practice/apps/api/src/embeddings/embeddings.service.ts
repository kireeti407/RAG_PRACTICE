import { Injectable, Logger } from '@nestjs/common';
import { Ollama } from 'ollama';

const VECTOR_SIZE = 384;

@Injectable()
export class EmbeddingsService {
  private readonly logger = new Logger(EmbeddingsService.name);
  private readonly ollama = new Ollama({
    host: process.env.OLLAMA_HOST ?? 'http://localhost:11434',
  });

  async embedChunks(chunks: string[]) {
    try {
      const embeddings = await this.ollama.embed({
        model: process.env.EMBEDDING_MODEL ?? 'nomic-embed-text',
        input: chunks,
      });
      return embeddings.embeddings;
    } catch (error) {
      this.logger.warn(
        `Ollama embeddings unavailable (${this.describeError(error)}). Using local embeddings.`,
      );
      return chunks.map((chunk) => this.embedLocally(chunk));
    }
  }

  private embedLocally(text: string): number[] {
    const vector = new Array<number>(VECTOR_SIZE).fill(0);
    const tokens = text.toLowerCase().split(/\W+/).filter(Boolean);

    for (const token of tokens) {
      let hash = 2166136261;
      for (let i = 0; i < token.length; i++) {
        hash ^= token.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
      }
      const index = Math.abs(hash) % VECTOR_SIZE;
      vector[index] += 1;
    }

    const norm =
      Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
    return vector.map((value) => value / norm);
  }

  private describeError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'unknown error';
  }
}
