import { Component, Input } from '@angular/core';
import { WebsocketService } from '../../../../../service/websocket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  @Input() username!: string;
  @Input() roomId!: string | null;

  constructor(private clientWebSocketService: WebsocketService) { }

  cellClick(event: Event) {
    const cell = event.target as HTMLElement;
    cell.setAttribute("disabled", "true");
    cell.style.backgroundColor = "red";
  }
}