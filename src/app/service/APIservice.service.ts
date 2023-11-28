import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { BillBoard } from '../models/BillboardModel';
import { Course } from '../models/CourseModel';
import { TreeNode } from 'primeng/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
// const apiUrl = 'https://ongbutdicodev1.onrender.com/api/';
const apiUrl = 'http://localhost:5000/api/';
@Injectable({
  providedIn: 'root',
})
export class APIService {
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

  getCoursebyId(courseId: any): Observable<Course> {
    return this.httpClient
      .get<Course>(`${apiUrl}course/${courseId}`)
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

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.httpClient
      .post(`${apiUrl}/auth/signin`, body)
      .pipe(catchError(this.handleError<any>()));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
