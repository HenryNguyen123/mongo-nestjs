import { Injectable } from '@nestjs/common';

@Injectable()
export class PresenceService {
  private readonly users = new Map<string, Set<string>>();
  constructor() {}
  online(userId: string, socketId: string) {
    if (!this.users.has(userId)) {
      this.users.set(userId, new Set());
    }
    this.users.get(userId)?.add(socketId);
  }
  offline(socketId: string) {
    for (const [userId, sockets] of this.users.entries()) {
      if (sockets.has(socketId)) {
        sockets.delete(socketId);
        if (sockets.size === 0) {
          this.users.delete(userId);
        }
        return userId;
      }
    }
    return null;
  }
  getOnline() {
    return [...this.users.keys()];
  }
  isOnline(id: string) {
    const userId: string = id;
    return this.users.has(userId);
  }
}
