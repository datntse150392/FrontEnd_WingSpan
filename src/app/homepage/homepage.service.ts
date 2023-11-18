import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { BillBoard } from '../models/BillboardModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
const apiUrl = 'https://ongbutdicodev1.onrender.com/api/';
@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  constructor(private httpClient: HttpClient) {}
  getAllBillBoards(): Observable<BillBoard[]> {
    return this.httpClient
      .get<BillBoard[]>(`${apiUrl}billboard/getAllBillboard`)
      .pipe(catchError(this.handleError<BillBoard[]>('getAllBillBoards', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
