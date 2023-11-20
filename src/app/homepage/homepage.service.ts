import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { BillBoard } from '../models/BillboardModel';
import { Course } from '../models/CourseModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
// const apiUrl = 'https://ongbutdicodev1.onrender.com/api/';
const apiUrl = 'http://localhost:5000/api/';
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

  getAllCourses(): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(`${apiUrl}course/getAllCourses`)
      .pipe(catchError(this.handleError<Course[]>('getAllCourses', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
