import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { InterfaceMessage } from '../authenticated_section/user-section/room/game-room/chat/chat.component';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient!: Client;

  private listRooms = new BehaviorSubject<any[]>([]);
  private isConnected = new BehaviorSubject<boolean>(false);
  private listMessageRoom = new BehaviorSubject<string>("");

  private listRoomSubscribe!: any;
  private listMessageSubscribe!: any;

  constructor() { }

  isWebsocketConnected(): Observable<boolean> {
    return this.isConnected.asObservable();
  }

  getListRooms(): Observable<any[]> {
    return this.listRooms.asObservable();
  }

  getMessageRoom(): Observable<string> {
    return this.listMessageRoom.asObservable();
  }

  /************** Connection ********************/
  connect() {
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

  /************** User ********************/
  sendMessageAddUser(username: string) {
    this.stompClient.publish({
      destination: "/app/user",
      body: JSON.stringify({ "username": username })
    });
  }

  /************** Room ********************/
  /***** Join *****/
  sendMessageJoinRoomSocket(idRoom: string, username: string) {
    this.stompClient.publish({
      destination: "/app/room/join",
      body: JSON.stringify({ "username": username, "roomId": idRoom })
    });
  }
  /***** Leave *****/
  sendMessageLeaveRoom(idRoom: string, username: string) {
    this.stompClient.publish({
      destination: "/app/room/leave",
      body: JSON.stringify({ "username": username, "roomId": idRoom })
    });
  }
  /***** ListRoom *****/
  sendMessageGetListRoom() {
    this.stompClient.publish({
      destination: "/app/room/list",
    });
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

  unSubscribleListRoom() {
    this.listRoomSubscribe.unsubscribe();
  }

  /************** Messages ********************/
  /***** Send *****/
  sendMessageInRoom(roomId: string) {
    this.stompClient.publish({
      destination: `/app/room/${roomId}/message`,
      body: JSON.stringify({ "username": "username", "message" : "bonjour"})
    });
  }

  /***** Subscribe *****/
  subscribeMessageRoom(roomId: string) {
    this.listMessageSubscribe = this.stompClient.subscribe(`/room/${roomId}/message`, (message) => {
      console.log(message.body);
      this.listMessageRoom.next(message.body);
    });
  }
}