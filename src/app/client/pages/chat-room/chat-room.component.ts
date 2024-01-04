import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConfigLocal } from 'src/app/core/models';
import { ChatRoom } from 'src/app/core/models/chatRoom';
import { ShareService } from 'src/app/core/services';
import { ChatService } from 'src/app/core/services/chat.service';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  newMessage = '';
  roomId!: number;
  chatRoom: ChatRoom[] = [];
  userName!: string;
  inRoom = false;
  configLocal!: ConfigLocal;

  private detroy$ = new Subject<void>();

  constructor(
    private chatService: ChatService,
    private shareService: ShareService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.configLocal = this.shareService.parseData();

    this.chatService.getRooms().subscribe((res: any) => {
      if (res.status === 200) {
        this.chatRoom = res.data;
      }
    });
  }

  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }

  /**
   * Logic Func: Require Login
   */
  requireLogin() {
    this.router.navigate(['/auth/signIn']);
  }
}
