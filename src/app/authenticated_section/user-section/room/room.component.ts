import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../../service/websocket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  roomId!: string | null;
  username!: string;

  constructor(private activatedRoute: ActivatedRoute, private clientWebSocket: WebsocketService){}

  ngOnInit(){
    this.roomId = this.activatedRoute.snapshot.paramMap.get("roomId");
    this.activatedRoute.queryParams.subscribe(params => {
      this.username = params["username"];
    });

    this.clientWebSocket.subscribeGame(this.roomId!);
  }
}
