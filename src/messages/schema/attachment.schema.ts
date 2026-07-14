import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Attachment {
  @Prop({ required: true })
  url!: string;

  @Prop({ required: true })
  fileName!: string;

  @Prop({ required: true })
  mimeType!: string;

  @Prop({ required: true })
  size!: number;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
