import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(private socket: Socket) { }

  sendUserTypingMessage(data) {
    this.socket.emit('userTyping', data);
  }

  recieveUserTypingMessage() {
    return this.socket
    .fromEvent('userTyping').map(data => data);
}

  sendMessage(data) {
    this.socket.emit('chat message', data);
  }

  getMessage() {
    return this.socket
        .fromEvent('chat message')
        .map(data => data);
  }

}
