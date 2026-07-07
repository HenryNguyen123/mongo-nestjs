import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FriendDocument = HydratedDocument<Friend>;
@Schema({
  timestamps: true,
})
export class Friend {
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
export const FriendSchema = SchemaFactory.createForClass(Friend);
