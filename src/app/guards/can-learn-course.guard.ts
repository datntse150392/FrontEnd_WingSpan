import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ConfigLocal, Course, User } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class CanLearnCourseGuard {
  user: User = {};
  configLocal: ConfigLocal;

  constructor(private router: Router) {
    this.configLocal = { userInfo: {} };
  }

  canActivate(childRoute: ActivatedRouteSnapshot): boolean {
    try {
      const { courseId } = childRoute.params;
      this.configLocal.userInfo = this.parseData().userInfo;

      const courseArray = this.configLocal.userInfo.enrolledCourses;
      if (courseArray?.find((course: Course) => course._id === courseId)) {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.router.navigate(['/']);
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
