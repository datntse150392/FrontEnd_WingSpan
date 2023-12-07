import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './Auth.service';
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
}
