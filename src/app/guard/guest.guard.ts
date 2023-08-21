import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';
@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {

    constructor(private router: Router, private sessionService: SessionService) { }

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
       
        if (this.sessionService.getSession('registerdUser')) {
            // logged in so return true
            let registerUser = JSON.parse(this.sessionService.getSession('registerdUser'))
            if (!registerUser?.is_logged_in) {
                return true
            }
            else{
                this.router.navigate(['/dashboard']);
                return false;  
              }
       
        }
        return true;
    }
}
