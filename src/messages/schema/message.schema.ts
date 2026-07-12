import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;
@Schema({
  timestamps: true,
})
export class Message {
  @Prop({
    required: true,
  })
  user1!: string;

  @Prop({
    required: true,
  })
  user2!: string;

  createdAt?: Date;
}
export const FriendSchema = SchemaFactory.createForClass(Message);
