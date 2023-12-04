import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { User } from 'src/app/models/UserModel';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class UserAPIService {
  constructor(private httpClient: HttpClient) {}

  isCheckAccount(email: any): Observable<any> {
    const body = { email };
    return this.httpClient
      .post(`${environment.apiUrl}auth/isCheckAccount`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  getUser(userId: any): Observable<User> {
    const body = { userId };
    return this.httpClient
      .post(`${environment.apiUrl}user/getUser`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  getUserByEmail(email: any): Observable<User> {
    const body = { email };
    return this.httpClient
      .post(`${environment.apiUrl}user/getUserByEmail`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  updateInfo(email: any, fullName: any): Observable<any> {
    const body = { email, fullName };
    return this.httpClient
      .put(`${environment.apiUrl}user/updateInfo`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  /**
   * Logic code
   * @param userId
   * @returns {Observable}
   */
  getUserByUserId(_id: any): Observable<any> {
    const body = { _id };
    return this.httpClient.post(
      `${environment.apiUrl}user/getUserByUserId`,
      body
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
