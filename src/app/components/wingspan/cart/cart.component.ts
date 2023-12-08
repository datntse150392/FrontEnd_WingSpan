import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart.model';
import { CartService } from 'src/app/service/api/Cart.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { TransactionService } from 'src/app/service/api/Transaction.service';
import { ConfigLocal } from 'src/app/models/Config/localState';
import { ToastService } from 'src/app/service/ToastService.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
  totalPrice: number = 0;
  configLocal!: ConfigLocal;

  public payPalConfig?: IPayPalConfig;

  constructor(
    private cartService: CartService,
    private transactionService: TransactionService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const configLocalString = localStorage.getItem('configLocal');
    if (configLocalString) {
      this.configLocal = JSON.parse(configLocalString);
      const userId = JSON.parse(configLocalString).userInfo._id;
      this.cartService.getCartItems(userId).subscribe((res) => {
        if (res) {
          this.cart = res.data.cartItem;
          this.cart.items.map((item) => {
            this.totalPrice += item.amount;
            this.initConfig();
          });
        }
      });
    }
  }

  /**
   * Logic Func: Get Cart
   */
  getCartAndCountAmount() {
    try {
      const configLocalString = localStorage.getItem('configLocal');
      if (configLocalString) {
        const userId = JSON.parse(configLocalString).userInfo._id;
        this.cartService.getCartItems(userId).subscribe((res) => {
          if (res) {
            this.cart = res.data.cartItem;
            this.cart.items.map((item) => {
              this.totalPrice += item.amount;
            });
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
    const amountInVND = this.totalPrice; // Số tiền thanh toán trong VND
    console.log(this.totalPrice);

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
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
          try {
            const cartId = this.cart._id;
            const customerEmail = this.configLocal.userInfo.email;
            const amount = this.totalPrice;
            const payer = details.payer;
            const transactionType = 'Register Course';
            const status = 'success';
            this.transactionService
              .processPaymentAndSaveTransaction(
                cartId,
                amount,
                payer,
                transactionType,
                status,
                customerEmail
              )
              .subscribe((res: any) => {
                if (res && res.status === 200) {
                  this.toastService.setToastIsTransaction(true);
                }
              });
          } catch (error) {
            console.log('Transaction process error', error);
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
}
