import { Expose } from 'class-transformer';

export class UserResDto {
  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  avatar?: string;

  @Expose()
  status!: string;

  @Expose()
  createdAt!: Date;
}
