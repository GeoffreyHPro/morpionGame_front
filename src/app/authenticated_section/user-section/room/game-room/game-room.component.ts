import { Component } from '@angular/core';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrl: './game-room.component.css'
})
export class GameRoomComponent {

  handleButtonStartGame(event: Event) {
    const htmlElement = event.target! as HTMLButtonElement;
    htmlElement.style.display = "none";
    const div = document.getElementById('game');
    div!.style.display = "flex";
  }
}
