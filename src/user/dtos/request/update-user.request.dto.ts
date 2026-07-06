import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserReq {
  @ApiProperty({
    example: '123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  avatar?: any;

  @ApiProperty({
    example: 'offline',
    required: false,
  })
  @IsNotEmpty()
  status?: string;
}
