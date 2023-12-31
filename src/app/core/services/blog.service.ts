import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { User } from '../models';
@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  header = this.authService.getHeaders(localStorage.getItem('token'));

  /**
   * Logic Call API: Get All Blogs
   */
  getAllBlogs(page: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.apiUrl}blog/getBlogs?page=${page}`
    );
  }

  /**
   * Logic Call API: Create Blog
   */
  createBlog(title: any, content: any, author: User): Observable<any> {
    const body = { title, content, author };
    return this.httpClient.post(`${environment.apiUrl}blog/createBlog`, body, {
      headers: this.header,
    });
  }

  /**
   * Logic Call API: Get Deatil Blog by Blog-ID
   */
  getDetailBlog(blogId: any): Observable<any> {
    const body = { blogId };
    return this.httpClient.post(`${environment.apiUrl}blog/getBlogById`, body);
  }
}
