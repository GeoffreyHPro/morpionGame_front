import { Component, Input } from '@angular/core';
import { WebsocketService } from '../../../../service/websocket.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent {
  listRooms!: any;
  @Input() username!: string;

  constructor(
    private clientWebSocket: WebsocketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.clientWebSocket.connect();
    setTimeout(() => {
      this.clientWebSocket.subscribeListRoom();
      this.clientWebSocket.sendMessageGetListRoom();
      this.clientWebSocket.sendMessageAddUser(this.username);
    }, 1000);

    this.clientWebSocket.getListRooms().subscribe(
      updatedListRooms => {
        this.listRooms = updatedListRooms;
      }
    );
  }

  joinRoom(roomId: string) {
    this.clientWebSocket.sendMessageJoinRoomSocket(roomId, this.username);
    this.router.navigate(["/room", roomId], { queryParams: { "username": this.username } })
  }

  createRoom() {
    const roomId = uuidv4();
    this.clientWebSocket.sendMessageCreateRoomSocket(roomId, this.username);
    this.router.navigate(["/room", roomId], { queryParams: { "username": this.username } })
  }
}