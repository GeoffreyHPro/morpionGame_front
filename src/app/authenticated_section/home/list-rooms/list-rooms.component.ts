import { Component } from '@angular/core';
import { WebsocketService } from '../../../service/websocket.service';

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
    this.clientWebSocket.isWebsocketConnected().subscribe(
      status => {
        this.isConnected = status;
        console.log(status)
      }
    )
  }

  getListRooms() {
    this.clientWebSocket.sendMessageGetListRoom();
    if (this.isConnected) {
      this.clientWebSocket.getListRooms().subscribe(
        message => {
          this.listRooms = message;
          console.log("list room " + JSON.parse(message.body))
        }
      )
    }
  }

  joinRoom(){
    this.clientWebSocket.sendMessageJoinRoomSocket();
  }
}