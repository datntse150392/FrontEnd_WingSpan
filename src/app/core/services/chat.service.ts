import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit {
  private socket;
  constructor(private httpClient: HttpClient) {
    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {}

  joinRoom(roomId: number, userId: string) {
    this.socket.emit('joinRoom', { roomId, userId });
  }

  sendMessage(roomId: number, userId: string, message: string) {
    this.socket.emit('sendMessage', { roomId, userId, message });
  }

  getMessages() {
    return new Observable((observer) => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }

  /**
   * Logic service: Get Rooms
   */
  getRooms(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}chatRoom/getRooms`);
  }

  /**
   * Logic Serivce: Get Messages History
   */
  getMessagesHistory(roomId: string): Observable<any> {
    return this.httpClient.get(
      `${environment.apiUrl}chatRoom/getHistoryMessage?roomId=${roomId}`
    );
  }
}
