import { Component, Input } from '@angular/core';
import { WebsocketService } from '../../../../service/websocket.service';

@Component({
  selector: 'app-user-informations',
  templateUrl: './user-informations.component.html',
  styleUrl: './user-informations.component.css'
})
export class UserInformationsComponent {
  isConnected = false;
  @Input() username: string = "";

  constructor(
    private clientWebSocket: WebsocketService) { }

  ngOnInit() {
    this.clientWebSocket.isWebsocketConnected().subscribe(
      status => {
        this.isConnected = status;
        console.log(status)
      }
    )
  }
}
