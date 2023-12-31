import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { BillBoard, Course } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services';
@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  /**
   * Delcre headers to authorization
   */
  headers = this.authService.getHeaders(localStorage.getItem('token'));

  getAllBillBoards(): Observable<BillBoard[]> {
    return this.httpClient
      .get<BillBoard[]>(`${environment.apiUrl}billboard/getAllBillboard`)
      .pipe(catchError(this.handleError<BillBoard[]>('getAllBillBoards', [])));
  }

  getAllCourses(): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(`${environment.apiUrl}course/getAllCourses`)
      .pipe(catchError(this.handleError<Course[]>('getAllCourses', [])));
  }

  getCoursebyId(courseId: any): Observable<Course> {
    return this.httpClient
      .get<Course>(`${environment.apiUrl}course/${courseId}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError<Course>('getAllBillBoards')));
  }

  tranferMainCourseById(id: any) {
    return this.getCoursebyId(id).pipe(
      map((res: any) => this.transformData(res.data.mainCourse))
    );
  }

  transformData(inputData: any[]): TreeNode<any>[] {
    return inputData.map((chapter, chapterIndex) => {
      return {
        key: chapterIndex.toString(),
        label: `${chapterIndex + 1}. ${chapter.chapterTitle}`,
        children: chapter.content.map((item: any, itemIndex: number) => {
          return {
            key: `${chapterIndex}-${itemIndex}`,
            label: `${itemIndex + 1}. ${item.title}`,
            icon: 'pi pi-fw pi-video',
            data: item.src,
            type: 'url',
          };
        }),
      };
    });
  }

  login(username: any, password: any): Observable<any> {
    const body = { username, password };
    return this.httpClient
      .post(`${environment.apiUrl}auth/signin`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  register(email: any, username: any, password?: any, profileImage?: any) {
    const body = { email, username, password };
    return this.httpClient
      .post(`${environment.apiUrl}auth/signup`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
