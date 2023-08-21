import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private sessionService : SessionService) {
  }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.sessionService.getSession('registerdUser')) {
      // logged in so return true
      let registerUser = JSON.parse(this.sessionService.getSession('registerdUser'))
      if (registerUser?.is_logged_in) {
        return true;
      }
      else{
        this.router.navigate(['/']);
        return false;  
      }
    }
    else{
      this.router.navigate(['/']);
      return false;  
    }
  }
}