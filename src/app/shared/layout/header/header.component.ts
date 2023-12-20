import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ConfigLocal, UpdateEventCart, User } from 'src/app/core/models';
import {
  AuthService,
  CartService,
  CodeService,
  ShareService,
  ToastService,
} from 'src/app/core/services';
import { UserAPIService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Declare variables
  configLocal: ConfigLocal = {
    userInfo: {},
    cartItems: undefined,
  };
  items: MenuItem[] | undefined;
  sidebarVisible: boolean = false;
  user!: User;
  visible: boolean = false;

  // Khai báo subscription để theo dõi
  private configLocalUpdateSubscription: Subscription | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private userAPIService: UserAPIService,
    private authService: AuthService,
    private cartService: CartService,
    private shareService: ShareService,
    private toastService: ToastService,
    private codeService: CodeService,
    private router: Router
  ) {}

  /**
   * Declare activeForm to active Course
   */
  activeForm = new FormGroup({
    code: new FormControl(''), // Default Value
  });

  ngOnInit(): void {
    this.items = [
      {
        label: 'Tài khoản',
        items: [
          {
            label: 'Trang cá nhân',
            routerLink: '/profile',
          },
          {
            label: 'Giỏ hàng của tôi',
            routerLink: '/myCart',
          },
          {
            label: 'Lịch sử giao dịch',
            routerLink: '/myTransaction',
          },
        ],
      },
      {
        label: 'Cài đặt',
        items: [
          {
            label: 'Kích hoạt khóa học',
            command: () => {
              this.showDialogActiveCourse();
            },
          },
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
   * Login Func: Get Cart Item
   */
  getCartItems(userId: any) {
    this.cartService.getCartItems(userId).subscribe((res: any) => {
      if (res && res.status === 200) {
        this.configLocal.cartItems = res.data.cartItem;
      }
      localStorage.setItem('configLocal', JSON.stringify(this.configLocal));
    });
  }

  /**
   * Login Func:  Show Dialog Active Course
   */
  showDialogActiveCourse() {
    this.visible = true;
  }

  /**
   * Logic Code: Actvie Course
   */
  activeCourse(code: any) {
    try {
      if (this.configLocal.userInfo._id) {
        this.codeService
          .activeCourse(code, this.configLocal.userInfo._id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res: any) => {
              if (res && res.status === 200) {
                this.toastService.setMessageToastActiveCourse({
                  isActiveCourse: true,
                  operationType: 'success',
                });
                this.router.navigate(['/']);
              } else {
                if (res.message == 'Code was Actived') {
                  this.toastService.setMessageToastActiveCourse({
                    isActiveCourse: false,
                    operationType: 'Actived',
                  });
                } else if (res.message == 'Not Found Code') {
                  this.toastService.setMessageToastActiveCourse({
                    isActiveCourse: false,
                    operationType: 'Not Found',
                  });
                } else {
                  this.toastService.setMessageToastActiveCourse({
                    isActiveCourse: false,
                    operationType: 'Course was enrollmenteded',
                  });
                }
              }
            },
            error: (err: Error) => {
              console.log(err);
            },
            complete: () => {
              this.visible = false;
            },
          });
      }
    } catch (error) {}
  }
}
