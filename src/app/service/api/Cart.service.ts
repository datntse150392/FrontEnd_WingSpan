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

  getCartItems(userId: any): Observable<any> {
    const body = { userId };
    return this.httpClient.post(`${environment.apiUrl}cart`, body, {
      headers: this.authService.getHeaders(localStorage.getItem('token')),
    });
  }
}
