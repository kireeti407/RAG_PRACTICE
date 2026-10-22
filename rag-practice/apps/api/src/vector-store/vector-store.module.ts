import { Module } from '@nestjs/common';
import { QdrantService } from './vectorstore.servie';

@Module({
  providers: [QdrantService],
  exports: [QdrantService],
})
export class VectorStoreModule {}
