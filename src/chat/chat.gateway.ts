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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
    console.log('Connected:', client.id);
  }
  //discoonected
  handleDisconnect(client: Socket) {
    console.log('Disconnected:', client.id);
  }
}
