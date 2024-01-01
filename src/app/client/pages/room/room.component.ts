import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigLocal } from 'src/app/core/models';
import { ShareService } from 'src/app/core/services';
import { SocketService } from 'src/app/core/services/socket.io.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  configLocal!: ConfigLocal;
  userId: String | undefined;
  messages: any[] = [];
  newMessage = '';
  roomId!: number;
  userName!: string;
  inRoom = false;
  messagesHistory: any[] = [];

  constructor(
    private chatService: SocketService,
    private shareService: ShareService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.roomId = +params['chatRoomId'];
      if (this.roomId) {
        this.chatService.joinRoom(this.roomId, this.userName);
        this.inRoom = true;
      }
    });
    this.configLocal = this.shareService.parseData();
    this.userId = this.configLocal.userInfo._id;

    this.getMessagesHistory(this.roomId);

    this.chatService.getMessages().subscribe((data: any) => {
      console.log(data);
      if (data.userId === this.userId) {
        this.saveMessages(
          this.roomId,
          data.userId,
          data.timestamp,
          data.message
        );
      }

      setTimeout(() => {
        this.getMessagesHistory(this.roomId);
      }, 500);
    });
  }

  joinRoom() {
    if (this.roomId && this.userName) {
      this.chatService.joinRoom(this.roomId, this.userName);
      this.inRoom = true;
    }
  }

  sendMessage() {
    if (this.inRoom) {
      this.chatService.sendMessage(this.roomId, this.userId, this.newMessage);
      this.newMessage = '';
    }
  }

  /**
   * Logic Call API: Get Messages History
   */
  getMessagesHistory(roomId: number) {
    this.chatService.getMessagesHistory(roomId).subscribe((res: any) => {
      if (res.status === 200) {
        this.messagesHistory = res.data;
        console.log(this.messagesHistory);
      }
    });
  }

  /**
   * Logic Call API: Save messages
   */
  saveMessages(roomId: number, userId: any, timestamp: any, message: string) {
    this.chatService
      .saveMessages(roomId, userId, timestamp, message)
      .subscribe((res: any) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      });
  }
}
