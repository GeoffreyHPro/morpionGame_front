import { Component } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { WebsocketService } from '../../../service/websocket.service';

interface InterfaceMessage {
  content: string,
  sender: string,
  type: string,
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  isConnected = false;
  messages: InterfaceMessage[] = [];
  newMessage: string = '';
  username: string = '';
  inputIsDisabled = "true";

  constructor(private clientWebSocket: WebsocketService) { }

  ngOnInit() {
    this.clientWebSocket.connect();
  }
}