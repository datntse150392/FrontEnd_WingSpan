// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // is check user has in the system ?
    const isLoggedIn = localStorage.getItem('configLocal');

    if (!isLoggedIn) {
      // If user was logge, so redirect user to homepage
      this.router.navigate(['/']);
    }
    // If user is't login so access this path
    return true;
  }
}
