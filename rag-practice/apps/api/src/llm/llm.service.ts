import { Injectable } from '@nestjs/common';
import { Ollama } from 'ollama';

@Injectable()
export class LlmService {
  private readonly ollama = new Ollama({
    host: process.env.OLLAMA_HOST ?? 'http://localhost:11434',
  });

  async generateReply(prompt: string, chunks: string[]) {
    const context = chunks.filter(Boolean).join('\n\n');

    const response = await this.ollama.chat({
      model: process.env.LLM_MODEL ?? 'llama3.2',
      messages: [
        {
          role: 'system',
          content:
            'Answer using only the provided document context. If the context is not enough, say you do not know.',
        },
        {
          role: 'user',
          content: `Context:\n${context || '(no documents retrieved)'}\n\nQuestion: ${prompt}`,
        },
      ],
    });

    return response.message.content;
  }
}
