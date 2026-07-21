import { NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { PresenceService } from 'src/chat/services/presence.service';
import { IPayloadJWTLogin } from 'src/user/interfaces/login.interface';

export interface SocketData {
  userId: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly presenceService: PresenceService,
  ) {}
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('message')
  async sendMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('data: ', data);
    this.server.emit('receive-message', data);
  }
  //connected
  handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token as string;
      const payload = this.jwtService.verify<IPayloadJWTLogin>(token);
      const userId = payload.sub;
      if (!token) {
        client.disconnect();
        return;
      }
      if (userId.length <= 0)
        throw new NotAcceptableException('dont have user');
      (client.data as SocketData).userId = userId;
      this.presenceService.online(userId, client.id);
      console.log('Connected:', client.id);
      this.server.emit('user-online', {
        userId,
      });
    } catch (error) {
      console.log(error);
      client.disconnect();
    }
  }
  //discoonected
  handleDisconnect(client: Socket) {
    console.log('Disconnected:', client.id);
  }
}
