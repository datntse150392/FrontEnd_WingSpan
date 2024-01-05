import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigLocal } from 'src/app/core/models';
import { ChatRoom } from 'src/app/core/models/chatRoom';
import { ShareService } from 'src/app/core/services';
import { ChatService } from 'src/app/core/services/chat.service';
import { SocketService } from 'src/app/core/services/socket.io.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  configLocal!: ConfigLocal;
  chatRoom: ChatRoom[] = [];
  userId: String | undefined;
  messages: any[] = [];
  newMessage = '';
  roomId!: number;
  userName!: string;
  inRoom = false;
  messagesHistory: any[] = [];

  isTyping: boolean = false;
  isUserTyping: boolean = false;

  private subscriptions = new Subscription();
  private shouldScrollToBottom = false;
  constructor(
    private socketService: SocketService,
    private shareService: ShareService,
    private activeRoute: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.setupUser();
    this.setupRoom();
    this.listenForTyping();
    this.listenForMessages();
    this.getRooms();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewChecked(): void {
    // If shouldScrollToBottom is true, then scroll to the bottom
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false; // Reset the flag
    }
  }

  private getRooms() {
    const getRoomsSub = this.chatService.getRooms().subscribe((res: any) => {
      if (res.status === 200) {
        this.chatRoom = res.data;
      }
    });
    this.subscriptions.add(getRoomsSub);
  }

  private setupRoom(): void {
    const routeSub = this.activeRoute.params.subscribe((params) => {
      this.roomId = +params['chatRoomId'];
      if (this.roomId) {
        this.socketService.joinRoom(this.roomId, this.userId);
        this.inRoom = true;
        this.getMessagesHistory(this.roomId);
      }
    });
    this.subscriptions.add(routeSub);
  }

  private setupUser(): void {
    this.configLocal = this.shareService.parseData();
    this.userId = this.configLocal.userInfo._id;
    console.log(this.userId);
  }

  private listenForMessages(): void {
    const msgSub = this.socketService.getMessages().subscribe((data: any) => {
      this.isTyping = false;

      // Fetch new messages after a delay to allow time for the DOM to update
      setTimeout(() => {
        this.getMessagesHistory(this.roomId);
      }, 1000);
    });
    this.subscriptions.add(msgSub);
  }

  joinRoom() {
    if (this.roomId && this.userName) {
      this.socketService.joinRoom(this.roomId, this.userName);
      this.inRoom = true;
    }
  }

  sendMessage() {
    if (this.newMessage !== '') {
      if (this.inRoom) {
        this.saveMessages(
          this.roomId,
          this.userId,
          Date.now(),
          this.newMessage
        );
        this.socketService.sendMessage(
          this.roomId,
          this.userId,
          this.newMessage
        );
        this.newMessage = '';
      }
    }
    this.isTyping = false;
  }

  private listenForTyping(): void {
    const typingSub = this.socketService.getTyping().subscribe((data: any) => {
      if (data.userId === this.configLocal.userInfo._id) {
        this.isUserTyping = true;
        this.isTyping = false;
      } else {
        this.isUserTyping = false;
        this.isTyping = true;
      }
    });

    this.subscriptions.add(typingSub);
  }

  typingMessage() {
    if (this.inRoom) {
      this.socketService.typingMessage(
        this.roomId,
        this.userId,
        this.newMessage
      );
    }
  }

  /*
   * Logic Call API: Get Messages History
   */
  getMessagesHistory(roomId: number) {
    this.socketService.getMessagesHistory(roomId).subscribe((res: any) => {
      if (res.status === 200) {
        this.messagesHistory = res.data;
        this.shouldScrollToBottom = true; // Set the flag to scroll after view checks
      }
    });
  }

  /**
   * Logic Call API: Save messages
   */
  saveMessages(
    roomId: number,
    userId: any,
    timestamp: any = Date.now(),
    message: string
  ) {
    this.socketService
      .saveMessages(roomId, userId, timestamp, message)
      .subscribe((res: any) => {
        if (res.status === 200) {
          console.log(res.message, '->', message);
        }
      });
  }

  /**
   *
   */
  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}
