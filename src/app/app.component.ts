import { Component, OnInit } from '@angular/core';
import { ToastService } from './service/ToastService.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private toastService: ToastService) {}
  ngOnInit(): void {
    // Subscribe to the toast$ Observable to receive toast messages
    this.toastService.toast$.subscribe((isLogin) => {
      if (isLogin) {
        this.toastService.showLoginSuccess('Đăng nhập thành công!');
      } else {
        this.toastService.showLoginFail('Tài khoản không chính xác!');
      }
    });
  }
}
