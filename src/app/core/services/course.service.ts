import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseAPIService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  enrollCourse(userId: string, courseId: string): Observable<any> {
    const body = { userId, courseId };
    // Create an options object with headers
    const options = {
      headers: this.authService.getHeaders(localStorage.getItem('token')),
    };
    // Make an HTTP POST request to the specified API endpoint
    return this.httpClient
      .post(`${environment.apiUrl}course/enrollmentCourse`, body, options)
      .pipe(catchError(this.handleError<any>()));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
