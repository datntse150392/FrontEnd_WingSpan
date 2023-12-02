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
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    try {
      const { courseId } = childRoute.params;
      this.configLocal.userInfo = this.parseData().userInfo;
      console.log();
      if (
        !this.configLocal.userInfo.enrolledCourses?.filter(
          (item: Course) => item._id === courseId
        )
      ) {
        return this.router.navigate(['/']);
      }
    } catch (error) {
      return this.router.navigate(['/auth/login']);
    }
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
