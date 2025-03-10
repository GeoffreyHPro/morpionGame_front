import { Component, Input } from '@angular/core';
import { WebsocketService } from '../../../../service/websocket.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrl: './game-room.component.css'
})
export class GameRoomComponent {
  @Input() username!: string;
  @Input() roomId!: string | null;

  constructor( private clientWebSocket: WebsocketService){}

  handleButtonStartGame(event: Event) {
    console.log(this.roomId! + this.username);
    this.clientWebSocket.sendGameReady(this.roomId!, "READY" , this.username);
    const htmlElement = event.target! as HTMLButtonElement;
    htmlElement.style.display = "none";
    const div = document.getElementById('game');
    div!.style.display = "flex";
  }
}
