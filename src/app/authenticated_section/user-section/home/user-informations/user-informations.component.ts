import { Component } from '@angular/core';
import { UserInformationService } from '../../../../service/user-information.service';
import { WebsocketService } from '../../../../service/websocket.service';

@Component({
  selector: 'app-user-informations',
  templateUrl: './user-informations.component.html',
  styleUrl: './user-informations.component.css'
})
export class UserInformationsComponent {
  isConnected = false;
  username = "";

  constructor(
    private userInformationService: UserInformationService,
    private clientWebSocket: WebsocketService) { }

  ngOnInit() {
    this.clientWebSocket.isWebsocketConnected().subscribe(
      status => {
        this.isConnected = status;
        console.log(status)
      }
    )

    this.userInformationService.getUsername().subscribe(
      response => {
        this.username = response.body!.name;
      }
    )
  }
}
