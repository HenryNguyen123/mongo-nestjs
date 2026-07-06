import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { hashPassword } from 'src/common/utils/bcrypt-password.util';
import { CreateUserRequestDto } from 'src/user/dtos/request/create-user.request.dto';
import { UpdateUserReq } from 'src/user/dtos/request/update-user.request.dto';
import { UserResDto } from 'src/user/dtos/response/user.response.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  //create
  async create(
    body: CreateUserRequestDto,
    file: Express.Multer.File | null,
    path: string,
  ): Promise<UserResDto> {
    const { email, name, password, status } = body;
    const check = await this.userModel.findOne({ email });
    if (check) throw new BadRequestException('Email already exists');
    const hash = await hashPassword(password);
    const pathAvatar = file ? `${path}/${file.filename}` : null;
    // create document
    const user = await this.userModel.create({
      name: name,
      email: email,
      password: hash,
      avatar: pathAvatar,
      status: status,
    });
    const payload: UserResDto = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      status: user.status ?? 'offline',
      createdAt: user.createdAt,
    };
    return plainToInstance(UserResDto, { payload });
  }
  //read
  async read(): Promise<UserResDto> {
    const users = await this.userModel.find({});
    const listUsers: UserResDto[] = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      avatar: u.avatar,
      status: u.status ?? 'offline',
      createdAt: u.createdAt,
    }));
    return plainToInstance(UserResDto, { listUsers });
  }
  //get by id
  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new InternalServerErrorException('user not exist!');
    const payload: UserResDto = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      status: user.status ?? 'offline',
      createdAt: user.createdAt,
    };
    return plainToInstance(UserResDto, { payload });
  }
  //update
  async update(
    id: string,
    body: UpdateUserReq,
    file: Express.Multer.File | null,
    path: string,
  ) {
    const { password, status } = body;
    const check = await this.userModel.findById(id);
    if (!check) throw new NotFoundException('user not exist!');
    const payloadUpdate: Partial<User> = {
      avatar: file ? `${path}/${file.filename}` : check.avatar,
      status: status ?? check.status,
    };
    if (password) {
      payloadUpdate.password = await hashPassword(password);
    }
    const updateUser = await this.userModel.findByIdAndUpdate(
      id,
      payloadUpdate,
      { new: true },
    );
    if (!updateUser) throw new NotFoundException('User not found');
    const payload: UserResDto = {
      name: updateUser.name,
      email: updateUser.email,
      avatar: updateUser.avatar,
      status: updateUser.status ?? 'offline',
      createdAt: updateUser.createdAt,
    };
    return plainToInstance(UserResDto, { payload });
  }
}
