import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from 'src/chat/chat.module';
import { UserModule } from 'src/user/user.module';
import { FriendModule } from 'src/friend/friend.module';
import { ConversationModule } from 'src/conversation/conversation.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.NEST_MONGO_URL!),
    UserModule,
    ChatModule,
    FriendModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
