import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
@Injectable({ providedIn: 'root' })
export class ToastService {
  private isLogin = new BehaviorSubject<boolean>(true);
  private isRegister = new BehaviorSubject<boolean>(true);
  // Observable stream that components can subscribe to
  toast$ = this.isLogin.asObservable();
  toastRegister$ = this.isRegister.asObservable();

  constructor(private messageService: MessageService) {}

  setToastIsLogin(isLogin: boolean) {
    // Emit a success toast message
    this.isLogin.next(isLogin);
  }

  setToastIsRegister(isRegister: boolean) {
    // Emit a success toast message
    this.isRegister.next(isRegister);
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: message,
    });
  }

  showFail(message: string) {
    this.messageService.add({
      severity: 'warning',
      summary: 'Thất bại',
      detail: message,
    });
  }
}
