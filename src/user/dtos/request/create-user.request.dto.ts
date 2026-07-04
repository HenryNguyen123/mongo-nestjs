import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'user1',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({
    example: 'user1@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email!: string;

  @ApiProperty({
    example: '123456',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  avatar?: any;

  @ApiProperty({
    example: 'offline',
  })
  @IsNotEmpty()
  status?: string;
}
