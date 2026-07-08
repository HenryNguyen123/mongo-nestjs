import { Expose } from 'class-transformer';

export class FriendResDto {
  @Expose()
  user1!: string;

  @Expose()
  user2!: string;

  @Expose()
  createdAd?: Date;
}
