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
import { ShareService } from 'src/app/core/services';
import { SocketService } from 'src/app/core/services/socket.io.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  configLocal!: ConfigLocal;
  userId: String | undefined;
  messages: any[] = [];
  newMessage = '';
  roomId!: number;
  userName!: string;
  inRoom = false;
  messagesHistory: any[] = [];

  private subscriptions = new Subscription();
  private shouldScrollToBottom = false;
  constructor(
    private chatService: SocketService,
    private shareService: ShareService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setupRoom();
    this.setupUser();
    this.listenForMessages();
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

  private setupRoom(): void {
    const routeSub = this.activeRoute.params.subscribe((params) => {
      this.roomId = +params['chatRoomId'];
      if (this.roomId) {
        this.chatService.joinRoom(this.roomId, this.userName);
        this.inRoom = true;
        this.getMessagesHistory(this.roomId);
      }
    });
    this.subscriptions.add(routeSub);
  }

  private setupUser(): void {
    this.configLocal = this.shareService.parseData();
    this.userId = this.configLocal.userInfo._id;
  }

  private listenForMessages(): void {
    const msgSub = this.chatService.getMessages().subscribe((data: any) => {
      if (data.userId === this.userId) {
        this.saveMessages(
          this.roomId,
          data.userId,
          data.timestamp,
          data.message
        );
      }

      // Fetch new messages after a delay to allow time for the DOM to update
      setTimeout(() => {
        this.getMessagesHistory(this.roomId);
      }, 500);
    });
    this.subscriptions.add(msgSub);
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
        this.shouldScrollToBottom = true; // Set the flag to scroll after view checks
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

  /**
   *
   */
  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
