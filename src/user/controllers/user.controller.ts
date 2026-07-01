import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor() {}
  //create
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create() {}
  //read
  @Get()
  async read() {}
  //get by id
  @Get(':id')
  async findOne(@Param('id') id: string) {}
  //update
  @Patch(':id')
  async update(@Param('id') id: string) {}
  //delete
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {}
}
