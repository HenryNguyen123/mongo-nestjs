import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friend, FriendDocument } from 'src/friend/schema/friend.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class FriendService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Friend.name)
    private friendModel: Model<FriendDocument>,
  ) {}
}
