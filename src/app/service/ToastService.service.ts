import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
@Injectable({ providedIn: 'root' })
export class ToastService {
  private isLogin = new BehaviorSubject<boolean>(true);
  private isRegister = new BehaviorSubject<boolean>(true);
  private isEnrollCourse = new BehaviorSubject<boolean>(true);
  private isEditInfo = new BehaviorSubject<boolean>(true);
  // Observable stream that components can subscribe to
  toast$ = this.isLogin.asObservable();
  toastRegister$ = this.isRegister.asObservable();
  toastEnrollCourse$ = this.isEnrollCourse.asObservable();
  toastEditInfo$ = this.isEditInfo.asObservable();

  constructor(private messageService: MessageService) {}

  setToastIsLogin(isLogin: boolean) {
    // Emit a success toast message
    this.isLogin.next(isLogin);
  }

  setToastIsRegister(isRegister: boolean) {
    // Emit a success toast message
    this.isRegister.next(isRegister);
  }

  setToastIsEnrollCourse(isEnrollCourse: boolean) {
    this.isEnrollCourse.next(isEnrollCourse);
  }

  setToastIsEditinfo(isEditInfo: boolean) {
    this.isEditInfo.next(isEditInfo);
  }

  showSuccess(message: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: message,
    });
  }

  showFail(message: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: 'error',
      summary: 'Thất bại',
      detail: message,
    });
  }
}
