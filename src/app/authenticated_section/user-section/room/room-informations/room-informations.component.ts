import { Component, Input } from '@angular/core';
import { WebsocketService } from '../../../../service/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-informations',
  templateUrl: './room-informations.component.html',
  styleUrl: './room-informations.component.css'
})
export class RoomInformationsComponent {
  @Input() roomId!: string | null;
  @Input() username!: string;

  constructor(
    private webSocket: WebsocketService,
    private router: Router
  ) { }

  handleLeaveButton() {
    console.log(this.roomId)
    console.log(this.username)
    this.webSocket.sendMessageLeaveRoom(this.roomId!, this.username);
    this.router.navigateByUrl("home");
  }
}