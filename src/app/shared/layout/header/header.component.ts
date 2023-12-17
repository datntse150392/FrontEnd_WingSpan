import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ConfigLocal, UpdateEventCart, User } from 'src/app/core/models';
import { AuthService, CartService, ShareService } from 'src/app/core/services';
import { UserAPIService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined;
  configLocal: ConfigLocal = {
    userInfo: {},
    cartItems: undefined,
  };
  user!: User;

  // Khai báo subscription để theo dõi
  private configLocalUpdateSubscription: Subscription | undefined;

  private destroy$ = new Subject<void>();

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
            routerLink: '/profile',
          },
          {
            label: 'Giỏ hàng của tôi',
            routerLink: '/myCart',
          },
        ],
      },
      {
        label: 'Cài đặt',
        items: [
          {
            label: 'Cài đặt tài khoản',
            routerLink: '/settings/personal',
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
    if (localStorage.getItem('isLogin') === 'true') {
      this.configLocal.userInfo = this.parseData().userInfo;
      this.getUser();
      this.getUserByUserId();
      this.getCartItems(this.configLocal.userInfo._id);
      // Gán subscription cho updateConfigLocal$
      this.configLocalUpdateSubscription =
        this.shareService.updateConfigLocal$.subscribe(
          (res: UpdateEventCart) => {
            if (res.operationType === 'add') {
              this.cartService
                .getCartItems(this.configLocal.userInfo._id)
                .subscribe((res: any) => {
                  if (res && res.status === 200) {
                    this.configLocal.cartItems = res.data.cartItem;
                  }
                  localStorage.setItem(
                    'configLocal',
                    JSON.stringify(this.configLocal)
                  );
                });
            } else if (res.operationType === 'delete') {
              this.configLocal.cartItems = undefined;
              localStorage.setItem(
                'configLocal',
                JSON.stringify(this.configLocal)
              );
            } else if (res.operationType === 'update') {
              this.userAPIService
                .getUserByUserId(this.configLocal.userInfo._id)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                  next: (res: any) => {
                    this.user = res.data.user;
                  },
                  error: (err: Error) => {
                    console.log(err);
                  },
                  complete: () => {
                    this.configLocal.userInfo = this.user;
                    localStorage.setItem(
                      'configLocal',
                      JSON.stringify(this.configLocal)
                    );
                  },
                });
            }
          }
        );
    }
  }
  ngOnDestroy(): void {
    // Unsubscribe khi component được hủy
    if (this.configLocalUpdateSubscription) {
      this.configLocalUpdateSubscription.unsubscribe();
    }
    this.destroy$.next(), this.destroy$.complete();
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
   * Logic Func: Get user by userid
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
      if (res && res.status === 200) {
        this.configLocal.cartItems = res.data.cartItem;
      }
      localStorage.setItem('configLocal', JSON.stringify(this.configLocal));
    });
  }
}
