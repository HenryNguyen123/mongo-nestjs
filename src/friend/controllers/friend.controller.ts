import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateFriendReqDto } from 'src/friend/dtos/request/create-friend.request.dto';
import { FriendService } from 'src/friend/services/friend.service';

@ApiTags('friend')
@Controller('friend')
export class FriendController {
  constructor(private friendService: FriendService) {}
  //create
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateFriendReqDto,
  })
  async create(@Body() body: CreateFriendReqDto) {
    return await this.friendService.create(body);
  }
  //get all
  @Get()
  async read() {}
  //find by id
  @Get(':id')
  async findOne() {}
  //update
  @Patch(':id')
  async update() {}
  //delete
  @Delete(':id')
  async remove() {}
}
