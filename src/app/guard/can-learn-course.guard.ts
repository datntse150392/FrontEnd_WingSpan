import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigLocal } from 'src/app/models/Config/localState';
import { Router } from '@angular/router';
import { Course } from '../models/CourseModel';
@Injectable({
  providedIn: 'root',
})
export class CanLearnCourseGuard {
  configLocal: ConfigLocal;
  constructor(private router: Router) {
    this.configLocal = { userInfo: {} };
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // is check user has in the system ?
    const isLoggedIn = localStorage.getItem('configLocal');

    if (isLoggedIn) {
      // If user was logge, so redirect user to homepage
      this.router.navigate(['/']);
    }
    // If user is't login so access this path
    return true;
  }

  parseData() {
    const configLocalString = localStorage.getItem('configLocal');
    if (configLocalString) {
      const configLocal = JSON.parse(configLocalString);
      return configLocal;
    }
    return null;
  }
}
