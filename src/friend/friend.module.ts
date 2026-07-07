import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendController } from 'src/friend/controllers/friend.controller';
import { Friend, FriendSchema } from 'src/friend/schema/friend.schema';
import { FriendService } from 'src/friend/services/friend.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Friend.name,
        schema: FriendSchema,
      },
    ]),
  ],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [],
})
export class FriendModule {}
