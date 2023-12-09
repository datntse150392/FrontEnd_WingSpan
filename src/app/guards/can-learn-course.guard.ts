import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigLocal, Course, User } from '../core/models';
import { UserAPIService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class CanLearnCourseGuard {
  user: User = {};
  configLocal: ConfigLocal;

  constructor(private router: Router, private userAPIService: UserAPIService) {
    this.configLocal = { userInfo: {} };
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    try {
      const { courseId } = childRoute.params;
      this.configLocal.userInfo = this.parseData().userInfo;
      this.getUserbyUserId(this.configLocal.userInfo._id);
      if (
        this.user &&
        this.user.enrolledCourses?.find((item: Course) => item._id === courseId)
      ) {
        return true;
      }
    } catch (error) {

      return this.router.navigate(['/']);
    }

    return this.router.navigate(['/']);
  }

  /**
   *
   * @returns UserInfo object
   */
  getUserbyUserId(userId: any) {
    try {
      this.userAPIService.getUserByUserId(userId).subscribe((res: any) => {
        this.user = res.data.user;
      });
    } catch (error) {}
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
