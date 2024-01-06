import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  header = this.authService.getHeaders(localStorage.getItem('token'));

  getCartItems(userId: any): Observable<any> {
    const body = { userId };
    return this.httpClient.post(`${environment.apiUrl}cart`, body, {
      headers: this.header,
    });
  }

  /**
   * Logic API: Add to cart
   */
  addToCart(userId: any, courseId: any): Observable<any> {
    const body = { userId, courseId };
    return this.httpClient.post(`${environment.apiUrl}cart/addToCart`, body, {
      headers: this.header,
    });
  }

  /**
   * Logic Call API: Delete cart by cartId
   */
  deleteCartItem(cartId: any, itemId: any): Observable<any> {
    const body = { cartId, itemId };
    return this.httpClient.delete(`${environment.apiUrl}cart/deleteCartItem`, {
      headers: this.header,
      body,
    });
  }

  /**
   * Logic Call API: Get All Vouchers With Type Normal
   */
  getAllVouchersWithTypeNormal(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.apiUrl}voucher/getAllVouchers`,
      {
        headers: this.header,
      }
    );
  }

  /**
   * Logic Sẻvice: Get Voucher by Code
   */
  getVoucherByCode(code: any): Observable<any> {
    const body = { code };
    return this.httpClient.post(
      `${environment.apiUrl}voucher/getVoucherByCode`,
      body,
      {
        headers: this.header,
      }
    );
  }
}
