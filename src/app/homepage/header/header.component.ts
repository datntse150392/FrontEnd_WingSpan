import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfigLocal } from 'src/app/models/Config/localState';
import { Router } from '@angular/router';
import { UserAPIService } from 'src/app/service/api/UserAPI.service';
import { User } from 'src/app/models/UserModel';

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
  user!: User;

  constructor(private router: Router, private userAPIService: UserAPIService) {}
  ngOnInit(): void {
    this.items = [
      {
        label: 'Tài khoản',
        items: [
          {
            label: 'Thông tin cá nhân',
            url: '/profile',
          },
        ],
      },
      {
        label: 'Cài đặt',
        items: [
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
      this.getUser();
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.configLocal.userInfo = {};
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getUser() {
    try {
      this.userAPIService
        .getUserByEmail(this.configLocal.userInfo.email)
        .subscribe((res: any) => {
          this.user = res.data.userInfo;
        });
    } catch (error) {}
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
