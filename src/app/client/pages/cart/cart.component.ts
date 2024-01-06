import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import {
  Cart,
  ConfigLocal,
  OperationType,
  UpdateEventCart,
  Voucher,
} from 'src/app/core/models';
import {
  CartService,
  ShareService,
  ToastService,
  TransactionService,
} from 'src/app/core/services';
import { Subject, Subscription, forkJoin, takeUntil } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  blockedUI: boolean = false;
  cart: Cart | any = {};
  configLocal!: ConfigLocal;
  DEFAULT: UpdateEventCart = {
    isUpdateConfigLocal: true,
    operationType: OperationType.Add,
  };
  totalPrice: number | any = 0;
  totalPriceBeforeDiscount: number | any = 0;
  payPalConfig?: IPayPalConfig;
  vouchersWithTypeNormal: Voucher[] | undefined;
  visibleDialogVoucher: boolean = false;
  selectedVoucher: Voucher | undefined;
  removeSelectedVoucher: number | undefined;

  private deleteCartSubscription: Subscription | undefined;
  private destroy$ = new Subject<void>();
  private isDeleteCart = new Subject<boolean>();
  private updateEventCart: UpdateEventCart = this.DEFAULT;

  constructor(
    private cartService: CartService,
    private transactionService: TransactionService,
    private toastService: ToastService,
    private shareService: ShareService,
    private router: Router
  ) {}

  isDeleteCart$ = this.isDeleteCart.asObservable();
  setIsDeleteCart(isDeleteCart: boolean) {
    this.isDeleteCart.next(isDeleteCart);
  }

  ngOnInit(): void {
    const configLocalString = localStorage.getItem('configLocal');
    if (configLocalString) {
      this.configLocal = JSON.parse(configLocalString);
      const userId = JSON.parse(configLocalString).userInfo._id;

      const getCartItems$ = this.cartService
        .getCartItems(userId)
        .pipe(takeUntil(this.destroy$));
      const getAllVouchersNormal$ = this.cartService
        .getAllVouchersWithTypeNormal()
        .pipe(takeUntil(this.destroy$));

      forkJoin([getCartItems$, getAllVouchersNormal$]).subscribe({
        next: ([cartItesRes, vouchersNormalRes]: [any, any]) => {
          if (cartItesRes) {
            this.cart = cartItesRes.data.cartItem;
            this.cart.items.map((item: any) => {
              this.totalPrice += item.amount;
              this.initConfig();
            });
          }
          if (vouchersNormalRes) {
            this.vouchersWithTypeNormal = vouchersNormalRes.data.vouchers;
          }
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.deleteCartSubscription?.unsubscribe();
  }

  /**
   * Logic Func: Get Cart
   */
  getCartAndCountAmount() {
    let newTotalPrice = 0;
    try {
      const configLocalString = localStorage.getItem('configLocal');
      if (configLocalString) {
        const userId = JSON.parse(configLocalString).userInfo._id;
        this.cartService.getCartItems(userId).subscribe((res) => {
          if (res) {
            this.cart = res.data.cartItem;
          }
        });
      }
    } catch (error) {}
  }

  // Function to convert from VND to EUR
  convertVNDtoEUR(amountInVND: any, exchangeRate: any) {
    return amountInVND / exchangeRate;
  }

  // Function to convert from EUR to VND
  convertEURtoVND(amountInEUR: any, exchangeRate: any) {
    return amountInEUR * exchangeRate;
  }

  private initConfig(): void {
    // Saving totalPriceBeforeDiscount
    this.totalPriceBeforeDiscount = this.totalPrice;

    const amountInVND = this.totalPrice; // Số tiền thanh toán trong VND

    const exchangeRate = 25000; // Tỉ giá hối đoái từ VND sang EUR (ví dụ)
    // Chuyển đổi số tiền sang EUR
    const amountInEUR = this.convertVNDtoEUR(amountInVND, exchangeRate);
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: amountInEUR.toFixed(2), // Giữ hai chữ số thập phân
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: amountInEUR.toFixed(2),
                  },
                },
              },
              items: [
                {
                  name: 'Thanh toán khóa học - PayPal',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: amountInEUR.toFixed(2),
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        this.blockedUI = true;
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
          try {
            const cartId = this.cart._id;
            const customerEmail = this.configLocal.userInfo.email;
            const amount = amountInVND;
            const payer = details.payer;
            const transactionType = 'Register Course';
            const status = 'success';
            const voucherId = this.selectedVoucher?._id;
            this.transactionService
              .processPaymentAndSaveTransaction(
                cartId,
                amount,
                payer,
                transactionType,
                status,
                customerEmail,
                voucherId
              )
              .subscribe((res: any) => {
                if (res && res.status === 200) {
                  this.toastService.setToastIsTransaction(true);
                  this.shareService.setIsUpdateConfigLocal(
                    (this.updateEventCart = {
                      isUpdateConfigLocal: true,
                      operationType: OperationType.Delete,
                    })
                  );
                  this.blockedUI = false;
                  this.router.navigate(['/']);
                }
              });
          } catch (error) {
            this.toastService.setToastIsTransaction(false);
          }
        });
      },
      onClientAuthorization: (data) => {},
      onCancel: (data, actions) => {},
      onError: (err) => {},
      onClick: (data, actions) => {},
    };
  }

  /**
   * Logic Func: Delete Cart by cartId
   */
  deleteCart(itemtId: any, amount: any) {
    try {
      this.deleteCartSubscription = this.cartService
        .deleteCartItem(this.configLocal.cartItems?._id, itemtId)
        .subscribe({
          next: (res) => {
            if (res && res.status === 200) {
              this.toastService.setToastIsDeleteCart(true);
              this.shareService.setIsUpdateConfigLocal(this.updateEventCart);

              // Update statue when complete func deleteCart()
              this.getCartAndCountAmount();

              if (this.cart.items.length <= 1) {
                this.selectedVoucher = undefined;
                this.totalPriceBeforeDiscount = 0;
                this.totalPrice = 0;
              } else if (this.cart.items.length > 1) {
                this.totalPrice -= amount;
                this.totalPriceBeforeDiscount -= amount;
              }
            }
          },
          error: (err: Error) => {
            console.log(err);
          },
          complete: () => {},
        });
    } catch (error) {}
  }

  /**
   * Logic Func: Selected Voucher
   */
  onVoucherChange() {
    // Logic to handle the selected voucher
    // You can access the selected voucher using the `selectedVoucher` property
    if (this.cart.items.length > 0) {
      if (this.selectedVoucher === null) {
        this.totalPriceBeforeDiscount =
          this.totalPriceBeforeDiscount + this.removeSelectedVoucher;
      } else if (this.selectedVoucher) {
        this.totalPriceBeforeDiscount =
          this.totalPriceBeforeDiscount - (this.selectedVoucher?.discount || 0);
        this.removeSelectedVoucher = this.selectedVoucher?.discount || 0;
      }
    } else if (this.cart.items.length <= 0) {
      this.totalPriceBeforeDiscount = 0;
      this.selectedVoucher = undefined;
    }
  }

  /**
   * Logic Func: Open Dialog Voucher
   */
  showDialogVoucher() {
    this.visibleDialogVoucher = true;
  }

  /**
   * Logic Func: Selected Voucher
   */
  setSelectedVoucher(voucher: Voucher) {
    this.visibleDialogVoucher = false;
    this.selectedVoucher = voucher;
    if (this.selectedVoucher === null) {
      this.totalPriceBeforeDiscount =
        this.totalPriceBeforeDiscount + this.removeSelectedVoucher;
    } else if (this.selectedVoucher) {
      this.totalPriceBeforeDiscount =
        this.totalPriceBeforeDiscount - (this.selectedVoucher?.discount || 0);
      this.removeSelectedVoucher = this.selectedVoucher?.discount || 0;
    }
  }

  /**
   * Logic Func: Delete Voucher
   */
  deleteVoucher() {
    this.selectedVoucher = undefined;
    this.totalPriceBeforeDiscount = this.totalPrice;
  }

  /**
   * Login Func: isExpirationDate
   */
  isExpirationDate(expirationDate: any) {
    const now = new Date();
    const expirationDateConvert = new Date(expirationDate);
    if (now.getTime() < expirationDateConvert.getTime()) {
      return true;
    }
    return false;
  }
}
