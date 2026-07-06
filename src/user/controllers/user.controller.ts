import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileImageInterceptor } from 'src/common/interceptor/upload-file-image.interceptor.common';
import { CreateUserRequestDto } from 'src/user/dtos/request/create-user.request.dto';
import { UpdateUserReq } from 'src/user/dtos/request/update-user.request.dto';
import { UserResDto } from 'src/user/dtos/response/user.response.dto';
import { UserService } from 'src/user/services/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  //create
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateUserRequestDto,
  })
  @UseInterceptors(
    UploadFileImageInterceptor('avatar', './public/images/avatar'),
  )
  async create(
    @Body() body: CreateUserRequestDto,
    @UploadedFile() file: Express.Multer.File | null,
  ): Promise<UserResDto> {
    const path: string = 'images/avatar';
    return this.userService.create(body, file, path);
  }
  //read
  @Get()
  async read(): Promise<UserResDto> {
    return await this.userService.read();
  }
  //get by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResDto> {
    return await this.userService.findOne(id);
  }
  //update
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateUserReq,
  })
  @UseInterceptors(
    UploadFileImageInterceptor('avatar', './public/images/avatar'),
  )
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserReq,
    @UploadedFile() file: Express.Multer.File | null,
  ): Promise<UserResDto> {
    const path: string = 'images/avatar';
    return await this.userService.update(id, body, file, path);
  }
  //delete
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {}
}
