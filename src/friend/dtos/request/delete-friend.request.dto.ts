import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class DeleteFriendReqDto {
  @ApiProperty({
    example: '11111111',
    required: true,
  })
  @IsString()
  @MinLength(2)
  friendId!: string;
}
