import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket;

  constructor(private httpClient: HttpClient) {
    this.socket = io('https://ongbutdicodev1.onrender.com');
  }

  joinRoom(roomId: number, userId: any) {
    this.socket.emit('joinRoom', { roomId, userId });
  }

  sendMessage(roomId: number, userId: any, message: string) {
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
   * Logic Serivce: Get Messages History
   */
  getMessagesHistory(roomId: number): Observable<any> {
    return this.httpClient.get(
      `${environment.apiUrl}chatRoom/getHistoryMessage?roomId=${roomId}`
    );
  }

  /**
   * Logic Service: Get save messages
   */
  saveMessages(
    roomId: number,
    userId: any,
    timestamp: any,
    message: string
  ): Observable<any> {
    const body = { roomId, userId, timestamp, message };
    return this.httpClient.post(`${environment.apiUrl}chatRoom/saveMessage`, {
      body,
    });
  }
}
