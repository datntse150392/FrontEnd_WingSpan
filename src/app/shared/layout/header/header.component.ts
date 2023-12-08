import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfigLocal, User } from 'src/app/core/models';
import { AuthService, CartService, ShareService } from 'src/app/core/services';
import { UserAPIService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined;
  configLocal: ConfigLocal = {
    userInfo: {},
    cartItems: undefined,
  };
  user!: User;

  constructor(
    private userAPIService: UserAPIService,
    private authService: AuthService,
    private cartService: CartService,
    private shareService: ShareService
  ) {}
  ngOnInit(): void {
    this.items = [
      {
        label: 'Tài khoản',
        items: [
          {
            label: 'Thông tin cá nhân',
            url: '/profile',
          },
          {
            label: 'Giỏ hàng của tôi',
            url: '/myCart',
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
      this.getUserByUserId();
      this.getCartItems(this.configLocal.userInfo._id);
    } catch (error) {
      console.log(error);
    }

    this.shareService.updateConfigLocal$.subscribe((res) => {
      if (res) {
        this.updateConfigLocal();
      }
    });
  }

  logout() {
    this.authService.logout();
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

  /**
   * @param userId
   * @return {User}
   */
  getUserByUserId() {
    const configLocalString = localStorage.getItem('configLocal');
    if (configLocalString) {
      this.userAPIService
        .getUserByUserId(this.configLocal.userInfo._id)
        .subscribe((res: any) => {
          this.user = res.data.user;
        });
    }
  }

  /**
   *
   *
   */
  getCartItems(userId: any) {
    this.cartService.getCartItems(userId).subscribe((res: any) => {
      this.configLocal.cartItems = res.data.cartItem;
      localStorage.setItem('configLocal', JSON.stringify(this.configLocal));
    });
  }

  /**
   * Logic Func: Update Config Local
   */
  updateConfigLocal() {
    this.getUserByUserId();
    this.getCartItems(this.configLocal.userInfo._id);
  }
}
