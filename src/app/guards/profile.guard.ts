import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ConfigLocal } from '../models/Config/localState';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  configLocal: ConfigLocal;

  constructor(private router: Router) {
    this.configLocal = { userInfo: {} };
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if the user is logged in or has the necessary permissions
    // Example: Replace the condition below with your actual authentication logic
    try {
      this.configLocal.userInfo = this.parseData().userInfo;
      if (!this.configLocal.userInfo.fullName) {
        return this.router.navigate(['/auth/signIn']);
      }
    } catch (error) {
      console.error('Error during user info parsing:', error);
      return this.router.navigate(['/auth/signIn']);
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
