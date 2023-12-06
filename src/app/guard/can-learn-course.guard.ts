import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigLocal } from 'src/app/models/Config/localState';
import { Router } from '@angular/router';
import { Course } from '../models/CourseModel';
import { User } from '../models/UserModel';
import { UserAPIService } from '../service/api/User.service';

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
      console.log('hi');

      return this.router.navigate(['/']);
    }
    console.log('hi');

    return this.router.navigate(['/']);
  }

  /**
   *
   * @returns UserInfo object
   */
  getUserbyUserId(userId: any) {
    try {
      this.userAPIService.getUserByUserId(userId).subscribe((res) => {
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
