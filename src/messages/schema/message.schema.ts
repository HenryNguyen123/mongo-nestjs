import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  Attachment,
  AttachmentSchema,
} from 'src/messages/schema/attachment.schema';

export type MessageDocument = HydratedDocument<Message>;
@Schema({
  timestamps: true,
})
export class Message {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Conversation',
  })
  conversationId!: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  senderId!: Types.ObjectId;

  @Prop({
    required: false,
    default: false,
  })
  isDeleted!: boolean;

  @Prop({
    required: false,
  })
  content!: string;

  @Prop({
    default: 'text',
  })
  type!: string;

  @Prop({
    type: [AttachmentSchema],
    default: [],
  })
  attachments!: Attachment[];

  createdAt?: Date;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
