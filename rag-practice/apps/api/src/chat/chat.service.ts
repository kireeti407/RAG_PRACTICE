import { Inject, Injectable } from '@nestjs/common';
import { RetrievalService } from '../rag/retrieval/retrival.service';
import { LlmService } from '../llm/llm.service';

@Injectable()
export class ChatService {
  constructor(
    @Inject(RetrievalService)
    private readonly retrievalService: RetrievalService,
    @Inject(LlmService)
    private readonly llmService: LlmService,
  ) {}

  async chat(message: string) {
    const chunks = await this.retrievalService.retrieve(message);
    const texts = chunks.filter(
      (chunk): chunk is string => typeof chunk === 'string',
    );
    const reply = await this.llmService.generateReply(message, texts);

    return { reply };
  }
}
