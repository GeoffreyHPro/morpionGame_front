import { Component, Input } from '@angular/core';
import { WebsocketService } from '../../../../service/websocket.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent {
  listRooms!: any;
  @Input() username!: string;

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
  }

  joinRoom(roomId: string) {
    this.clientWebSocket.sendMessageJoinRoomSocket(roomId, this.username);
  }
}