import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
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

  /**
   * Logic API Service: Get Transaction by UserID
   */
  getTransactionByUserId(userId: any): Observable<any> {
    const body = { userId };
    return this.httpClient.post(
      `${environment.apiUrl}transaction/getTransaction`,
      body,
      { headers: this.header }
    );
  }

  /**
   * Logic API Service: Get Detail Transaction by transctionId
   */
  getDetailTransaction(transactionId: any): Observable<any> {
    const body = { transactionId };
    return this.httpClient.post(
      `${environment.apiUrl}transaction/getDetailTransaction`,
      body,
      { headers: this.header }
    );
  }
}
