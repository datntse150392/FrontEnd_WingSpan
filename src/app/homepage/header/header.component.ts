import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfigLocal } from 'src/app/models/Config/localState';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  configLocal: ConfigLocal = {
    userInfo: {},
  };

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.items = [
      {
        label: 'Tài khoản',
        items: [
          {
            label: 'Khóa học',
          },
          {
            label: 'Thông tin các nhân',
          },
        ],
      },
      {
        label: 'Cài đặt',
        items: [
          {
            label: 'Thay đổi mật khẩu',
            url: '#',
          },
          {
            label: 'Đăng xuất',
            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];
    try {
      this.configLocal.userInfo = this.parseData().userInfo;
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.configLocal.userInfo = {};
    localStorage.clear();
    this.router.navigate(['/']);
    window.location.reload();
  }

  parseData() {
    const configLocalString = localStorage.getItem('configLocal');
    if (configLocalString) {
      const configLocal = JSON.parse(configLocalString);
      return configLocal;
    }
    return null;
  }
}
