import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from 'src/chat/controllers/chat.controller';
import { PresenceController } from 'src/chat/controllers/presence.controller';
import { ChatService } from 'src/chat/services/chat.service';
import {
  Conversation,
  ConversationSchema,
} from 'src/conversation/schema/conversation.scheme';
import {
  Attachment,
  AttachmentSchema,
} from 'src/messages/schema/attachment.schema';
import { Message, MessageSchema } from 'src/messages/schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
      {
        name: Conversation.name,
        schema: ConversationSchema,
      },
      {
        name: Attachment.name,
        schema: AttachmentSchema,
      },
    ]),
    JwtModule.register({}),
  ],
  controllers: [ChatController, PresenceController],
  providers: [ChatService],
  exports: [],
})
export class ChatModule {}
