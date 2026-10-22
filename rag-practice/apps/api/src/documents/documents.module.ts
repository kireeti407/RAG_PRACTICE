import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { ChunkingService } from '../rag/ingestion/chunking.service';
import { EmbeddingsModule } from '../embeddings/embeddings.module';
import { VectorStoreModule } from '../vector-store/vector-store.module';

@Module({
  imports: [EmbeddingsModule, VectorStoreModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, ChunkingService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
