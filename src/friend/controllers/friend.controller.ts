import { Controller } from '@nestjs/common';
import { FriendService } from 'src/friend/services/friend.service';

@Controller()
export class FriendController {
  constructor(private friendService: FriendService) {}
}
