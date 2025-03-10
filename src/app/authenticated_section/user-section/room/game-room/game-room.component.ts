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

  isGameInit: boolean = false;

  constructor(private clientWebSocket: WebsocketService) { }

  ngOnInit() {
    this.clientWebSocket.getGameMessage().subscribe(
      response => {
        if (response != "") {
          const gameMessage = convertToInterfaceGameMessage(response);
          if (gameMessage.type === "init_game") {
            this.disabledButtonToAvailable();
          }
        }
      }
    )
  }

  disabledButtonToAvailable() {
    this.isGameInit = true;
  }

  handleButtonStartGame(event: Event) {
    this.clientWebSocket.sendGameReady(this.roomId!, "READY", this.username);
    const htmlElement = event.target! as HTMLButtonElement;
    htmlElement.style.display = "none";
    const div = document.getElementById('game');
    div!.style.display = "flex";
  }
}

export interface InterfaceGameMessage {
  type: string,
  username: string
}

export function convertToInterfaceGameMessage(message: any) {
  const parsedBody: any = JSON.parse(message);
  const receivedMessage: InterfaceGameMessage = {
    type: parsedBody.type || "",
    username: parsedBody.username || ""
  };
  return receivedMessage;
}