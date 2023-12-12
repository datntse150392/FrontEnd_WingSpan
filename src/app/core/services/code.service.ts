import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CodeService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  header = this.authService.getHeaders(localStorage.getItem('token'));

  /**
   * Logic API: Active course
   */
  activeCourse(code: any, userId: any): Observable<any> {
    const body = { code, userId };

    return this.httpClient.post(
      `${environment.apiUrl}code/activeCourse`,
      body,
      { headers: this.header }
    );
  }
}
