import { Component } from '@angular/core';
import { WebsocketService } from '../../../../service/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent {
  isConnected = false;
  listRooms!: any;

  constructor(private clientWebSocket: WebsocketService) { }

  ngOnInit() {
    this.clientWebSocket.connect();
    setTimeout(() => {
      this.clientWebSocket.subscribeListRoom();
      this.clientWebSocket.sendMessageGetListRoom();
    }, 1000);

    this.clientWebSocket.getListRooms().subscribe(
      updatedListRooms => {
        this.listRooms = updatedListRooms;
        console.log("updated rooms : " + updatedListRooms)
      }
    );
    this.clientWebSocket.isWebsocketConnected().subscribe(
      status => {
        this.isConnected = status;
        console.log(status)
      }
    )
  }

  joinRoom(roomId: string) {
    this.clientWebSocket.sendMessageJoinRoomSocket(roomId);
  }
}