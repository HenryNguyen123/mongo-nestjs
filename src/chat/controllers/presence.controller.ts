import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PresenceService } from 'src/chat/services/presence.service';

@ApiTags('presence')
@Controller('presence')
export class PresenceController {
  constructor(private presenceService: PresenceService) {}
  @Get('online')
  async online() {
    return await this.presenceService.getOnline();
  }
  @Get(':id')
  async isOnline(@Param('id') id: string) {
    return await this.presenceService.isOnline(id);
  }
}
