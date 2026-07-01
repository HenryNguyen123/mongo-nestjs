import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name!: string;

  @Prop({
    unique: true,
  })
  email!: string;

  @Prop()
  password!: string;

  @Prop()
  avatar?: string;

  @Prop({
    default: 'offline',
  })
  status?: string;
}
