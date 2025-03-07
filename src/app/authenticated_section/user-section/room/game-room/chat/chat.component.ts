import { Component, Input } from '@angular/core';
import { WebsocketService } from '../../../../../service/websocket.service';

export interface InterfaceMessage {
  sender: string,
  content: string,
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @Input() username!: string;
  @Input() roomId!: string | null;

  isConnected = false;
  messages: InterfaceMessage[] = [];
  newMessage: string = '';
  inputIsDisabled = "true";

  constructor(private webSocket: WebsocketService) {
  }

  ngOnInit() {
    this.messages = [];
    this.webSocket.subscribeMessageRoom(this.roomId!);

    this.webSocket.getMessageRoom().subscribe(
      message => {
        this.messages.push(convertToInterfaceMessage(message));
      }
    );
  }

  ngOnDestroy(){
    this.messages = [];
  }

  sendMessage() {
    this.webSocket.sendMessageInRoom(this.roomId!, this.newMessage, this.username);
  }
}

export function convertToInterfaceMessage(message: any) {
  const parsedBody: any = JSON.parse(message);
  const receivedMessage: InterfaceMessage = {
    sender: parsedBody.username || "Empty Message",
    content: parsedBody.message || ""
  };
  return receivedMessage;
}