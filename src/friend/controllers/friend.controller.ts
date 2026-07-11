import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateFriendReqDto } from 'src/friend/dtos/request/create-friend.request.dto';
import { DeleteFriendReqDto } from 'src/friend/dtos/request/delete-friend.request.dto';
import { FriendResDto } from 'src/friend/dtos/response/friend.resquest.dto';
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
  async create(@Body() body: CreateFriendReqDto): Promise<FriendResDto> {
    return await this.friendService.create(body);
  }
  //get all
  @Get()
  async read(): Promise<FriendResDto> {
    return await this.friendService.read();
  }
  //find by id
  @Get(':id')
  async getFriends(@Param('id') id: string): Promise<FriendResDto> {
    return await this.friendService.getFriends(id);
  }
  //delete
  @Delete(':id')
  @HttpCode(204)
  @ApiBody({
    type: DeleteFriendReqDto,
  })
  async unfriend(@Param('id') id: string, @Body() body: DeleteFriendReqDto) {
    await this.friendService.unfriend(id, body);
  }
}
