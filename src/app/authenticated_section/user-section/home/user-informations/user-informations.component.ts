import { Component, Input } from '@angular/core';
import { WebsocketService } from '../../../../service/websocket.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-informations',
  templateUrl: './user-informations.component.html',
  styleUrl: './user-informations.component.css'
})
export class UserInformationsComponent {
  isConnected = false;
  @Input() username: string = "";

  constructor(private clientWebSocket: WebsocketService) { }

  ngOnInit() {
    this.clientWebSocket.isWebsocketConnected().subscribe(
      status => {
        this.isConnected = status;
        console.log(status)
      }
    )
  }

  createRoom() {
    const roomId = uuidv4();
    this.clientWebSocket.sendMessageCreateRoomSocket(roomId, this.username);
  }
}
