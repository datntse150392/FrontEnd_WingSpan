import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigLocal } from 'src/app/models/Config/localState';
import { Router } from '@angular/router';
import { ToastService } from '../service/ToastService.service';
@Injectable({
  providedIn: 'root',
})
export class CanLearnCourseGuard {
  configLocal: ConfigLocal;
  constructor(private router: Router, private toastService: ToastService) {
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
      this.configLocal.userInfo = this.parseData().userInfo;
      if (!this.configLocal.userInfo.fullName) {
        return this.router.navigate(['/auth/login']);
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
