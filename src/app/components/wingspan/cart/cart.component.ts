import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart.model';
import { CartService } from 'src/app/service/api/Cart.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
  totalPrice: number = 0;

  public payPalConfig?: IPayPalConfig;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartAndCountAmount();
    this.initConfig();
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
              console.log(item.amount);
            });
          }
        });
      }
    } catch (error) {}
  }

  private initConfig(): void {
    const amountInVND = 350000; // Số tiền thanh toán trong VND
    const exchangeRate = 25000; // Tỉ giá hối đoái từ VND sang EUR (ví dụ)
    // Chuyển đổi số tiền sang EUR
    const amountInEUR = amountInVND / exchangeRate;
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
                  name: 'Ôn ENW492c Cấp Tốc',
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
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
