import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(
    @Inject(ChatService)
    private readonly chatService: ChatService,
  ) {}

  @Post()
  async chat(@Body() body: { message?: string }) {
    const message = body?.message?.trim();
    if (!message) {
      throw new BadRequestException('message is required');
    }

    return this.chatService.chat(message);
  }
}
