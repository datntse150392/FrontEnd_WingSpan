import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './Auth.service';
@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  header = this.authService.getHeaders(localStorage.getItem('token'));

  /**
   * Logic API: Process Payment And Save Transaction
   */
  processPaymentAndSaveTransaction(
    cartId: any,
    amount: any,
    payer: any,
    transactionType: any,
    status: any,
    customerEmail: any
  ): Observable<any> {
    const body = {
      cartId,
      amount,
      payer,
      transactionType,
      status,
      customerEmail,
    };
    return this.httpClient.post(
      `${environment.apiUrl}transaction/processPaymentAndSaveTransaction`,
      body,
      {
        headers: this.header,
      }
    );
  }
}
