import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateFriendReqDto } from 'src/friend/dtos/request/create-friend.request.dto';
import { FriendResDto } from 'src/friend/dtos/response/friend.resquest.dto';
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
  //create
  async create(body: CreateFriendReqDto) {
    const { user1, user2 } = body;
    if (user1 === user2) throw new BadRequestException('Cannot add yourself');
    //check exists user
    const check = await this.userModel.find({
      _id: { $in: [user1, user2] },
    });
    if (check.length != 2) throw new BadRequestException('User not found');
    const exsited = await this.friendModel.findOne({
      $or: [
        { user1: user1, user2: user2 },
        { user1: user2, user2: user1 },
      ],
    });
    if (exsited) throw new BadRequestException('Already friends');
    //create friend
    const friend = await this.friendModel.create({
      user1: user1,
      user2: user2,
    });
    return plainToInstance(FriendResDto, {
      user1: friend.user1,
      user2: friend.user2,
      createAt: friend.createdAt,
    });
  }
  //get all friend
  async read(): Promise<FriendResDto> {
    const friends = await this.friendModel.find({});
    const listFriends: FriendResDto[] = friends.map((f) => ({
      user1: f.user1,
      user2: f.user2,
      createdAt: f.createdAt,
    }))
    return plainToInstance(FriendResDto, { listFriends });
  }
}
