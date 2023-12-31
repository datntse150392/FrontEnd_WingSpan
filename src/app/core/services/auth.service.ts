import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SocialAuthService } from '@abacritt/angularx-social-login';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = localStorage.getItem('token');

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  /**
   * Logic code handle for signin account
   * @param mail
   * @returns {Observable}
   */
  signIn(email: any): Observable<any> {
    const body = { email };
    return this.httpClient.post(`${environment.apiUrl}auth/signIn`, body);
  }

  /**
   * Logic code handle for sign up account
   * @param email
   * @param fullName
   * @returns {Observable}
   */
  signUp(email: any, fullName: any, profileImage: any): Observable<any> {
    const body = {
      email,
      fullName,
      profileImage,
    };
    return this.httpClient.post(`${environment.apiUrl}auth/signUp`, body);
  }

  /**
   * Logic code handle logout account
   */
  logout() {
    localStorage.clear();
    this.socialAuthService.signOut();
    this.router.navigate(['/auth/signIn']);
  }

  /**
   * Logic code handle for is check user is contained in the system
   * @param email
   * @returns {Observable}
   */
  isCheckAccount(email: any): Observable<any> {
    const body = { email };
    return this.httpClient.post(
      `${environment.apiUrl}auth/isCheckAccount`,
      body
    );
  }

  /**
   * Function to get headers to serve require need it
   */
  getHeaders(token: any) {
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
