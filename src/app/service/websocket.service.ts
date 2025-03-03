import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient!: Client;
  private isConnected = new BehaviorSubject<boolean>(false);
  private username: string = "";

  constructor() { }

  isWebsocketConnected(): Observable<boolean> {
    return this.isConnected.asObservable();
  }

  connect() {
    let number = Math.round(Math.random() * (0 - 2000) + 0);
    this.username = "username" + number;
    const socket = new SockJS('http://localhost:8080/wsAngular');

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000
    });

    this.stompClient.onConnect = () => {
      this.isConnected.next(true);
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('Error WebSocket:', error);
    };

    this.stompClient.activate();

    /*setTimeout(() => {
      if (this.isConnected) {
        this.sendMessageJoinRoomSocket();
      }
    }, 2000);
    setTimeout(() => {
      if (this.isConnected) {
        this.sendMessageGetListRoom();
      }
    }, 2000);*/
  }
  sendMessageJoinRoomSocket() {
    this.stompClient.publish({
      destination: "/app/room/join",
      body: JSON.stringify({ "username": this.username, "roomId": 1 })
    });
  }

  getListRooms(): Observable<any> {
    const subject = new Subject<any>()
    this.stompClient.subscribe("/room/list", (message) => {
      const listRoom = JSON.parse(message.body);
      console.log(message);
      subject.next(message);
      subject.complete();
    });
    return subject.asObservable();
  }

  sendMessageGetListRoom() {
    this.stompClient.publish({
      destination: "/app/room/list",
    });
  }

}
