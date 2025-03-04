import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient!: Client;
  private username: string = "";

  private listRooms = new BehaviorSubject<any[]>([]);
  private isConnected = new BehaviorSubject<boolean>(false);

  private listRoomSubscribe!: any;

  constructor() { }

  isWebsocketConnected(): Observable<boolean> {
    return this.isConnected.asObservable();
  }

  getListRooms(): Observable<any[]> {
    return this.listRooms.asObservable();
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
  }



  sendMessageJoinRoomSocket(idRoom: string, username: string) {
    this.stompClient.publish({
      destination: "/app/room/join",
      body: JSON.stringify({ "username": username, "roomId": idRoom })
    });
  }

  /************** User ********************/

  sendMessageAddUser(username: string) {
    this.stompClient.publish({
      destination: "/app/user",
      body: JSON.stringify({ "username": username })
    });
  }

  /************** Room ********************/

  sendMessageGetListRoom() {
    this.stompClient.publish({
      destination: "/app/room/list",
    });
  }

  unSubscribleListRoom() {
    this.listRoomSubscribe.unsubscribe();
  }

  subscribeListRoom() {
    this.listRoomSubscribe = this.stompClient.subscribe("/room/list", (message) => {
      const listRoom = JSON.parse(message.body);
      const arrayListRoom = Object.entries(listRoom).map(([key, value]) => ({
        roomId: key,
        users: value,
      }));
      this.listRooms.next(arrayListRoom);
    });
  }
}