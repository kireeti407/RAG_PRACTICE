import { Inject, Injectable } from '@nestjs/common';
import { EmbeddingsService } from '../../embeddings/embeddings.service';
import { QdrantService } from '../../vector-store/vectorstore.servie';


@Injectable()
export class RetrievalService {
    constructor(
        @Inject(EmbeddingsService)
        private readonly embeddingsService: EmbeddingsService,
        @Inject(QdrantService)
        private readonly qdrantService: QdrantService,
    ) {}
    async retrieve(query: string, limit = 5){
        const [queryVector] = await this.embeddingsService.embedChunks([query]);
        const results = await this.qdrantService.searchVector(queryVector, limit);
        
        return results.map((result)=> result.payload?.text);
        // results.flatMap((result) => {
        //     const text = result.payload?.text;
        // });
    }
}


