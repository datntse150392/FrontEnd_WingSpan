import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

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
