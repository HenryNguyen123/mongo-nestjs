import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    minLength: 2,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
    minLength: 2,
  })
  email!: string;

  @Prop({
    required: true,
    minlength: 6,
  })
  password!: string;

  @Prop()
  avatar?: string;

  @Prop({
    default: 'offline',
  })
  status?: string;

  createdAt!: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
