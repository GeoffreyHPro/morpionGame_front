import { Component, Input } from '@angular/core';
import { WebsocketService } from '../../../../../service/websocket.service';

interface InterfaceMessage {
  content: string,
  sender: string,
  type: string,
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

  constructor(private webSocket: WebsocketService){
    /*this.webSocket.getMessageRoom().subscribe(
      response => {
        console.log("");
      }
    )*/
  }

  sendMessage(){
    console.log(this.newMessage)
  }
}