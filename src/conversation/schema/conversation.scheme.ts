import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ConversationDocument = HydratedDocument<Conversation>;
@Schema({
  timestamps: true,
})
export class Conversation {
  @Prop({
    enum: ['private', 'group'],
    default: 'private',
  })
  type?: string;

  @Prop({
    required: false,
  })
  name?: string;

  @Prop({
    required: false,
  })
  avatar?: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    required: true,
  })
  members!: Types.ObjectId[];

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Message',
  })
  lastMessage?: Types.ObjectId;

  createdAt!: Date;
}
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
