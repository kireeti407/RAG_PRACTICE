import { Inject, Injectable } from '@nestjs/common';
import { ChunkingService } from '../rag/ingestion/chunking.service';
import { EmbeddingsService } from '../embeddings/embeddings.service';
import { QdrantService } from '../vector-store/vectorstore.servie';

@Injectable()
export class DocumentsService {
  constructor(
    @Inject(ChunkingService)
    private readonly chunkingService: ChunkingService,
    @Inject(EmbeddingsService)
    private readonly embeddingsService: EmbeddingsService,
    @Inject(QdrantService)
    private readonly qdrantService: QdrantService,
  ) {}

  async processDocument(file: Express.Multer.File) {
    const text = file.buffer.toString('utf-8');
    const chunks = this.chunkingService.chunkText(text);
    const embeddings = await this.embeddingsService.embedChunks(chunks);

    return this.qdrantService.storeVector(
      embeddings,
      chunks,
      file.originalname,
    );
  }
}
