import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class CourseAPIService {
  constructor(private httpClient: HttpClient) {}

  enrollCourse(userId: string, courseId: string): Observable<any> {
    const body = { userId, courseId };
    return this.httpClient
      .post(`${environment.apiUrl}course/enrollmentCourse`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
