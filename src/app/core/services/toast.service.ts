import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MessageToastActiveCourse } from '../models';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private isLogin = new BehaviorSubject<boolean>(true);
  private isRegister = new BehaviorSubject<boolean>(true);
  private isEnrollCourse = new BehaviorSubject<boolean>(true);
  private isEditInfo = new BehaviorSubject<boolean>(true);
  private isAddToCart = new BehaviorSubject<boolean>(true);
  private isDeleteCart = new BehaviorSubject<boolean>(true);
  private isTransaction = new BehaviorSubject<boolean>(true);
  private messageToastActiveCourse =
    new BehaviorSubject<MessageToastActiveCourse>({
      isActiveCourse: true,
      operationType: 'Success',
    });

  // Observable stream that components can subscribe to
  toast$ = this.isLogin.asObservable();
  toastRegister$ = this.isRegister.asObservable();
  toastEnrollCourse$ = this.isEnrollCourse.asObservable();
  toastEditInfo$ = this.isEditInfo.asObservable();
  toastAddToCart$ = this.isAddToCart.asObservable();
  toastDeleteCart$ = this.isDeleteCart.asObservable();
  toastTransaction$ = this.isTransaction.asObservable();
  messageToastActiveCourse$ = this.messageToastActiveCourse.asObservable();

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

  setToastIsAddToCart(isAddToCart: boolean) {
    this.isAddToCart.next(isAddToCart);
  }

  setToastIsDeleteCart(isDeleteCart: boolean) {
    this.isDeleteCart.next(isDeleteCart);
  }

  setToastIsTransaction(isTransaction: boolean) {
    this.isTransaction.next(isTransaction);
  }

  setMessageToastActiveCourse(
    messageToastActiveCourse: MessageToastActiveCourse
  ) {
    this.messageToastActiveCourse.next(messageToastActiveCourse);
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
