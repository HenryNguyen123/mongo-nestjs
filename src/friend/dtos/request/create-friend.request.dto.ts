import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFriendReqDto {
  @ApiProperty({
    example: '1111',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  user1!: string;

  @ApiProperty({
    example: '2222',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  user2!: string;
}
