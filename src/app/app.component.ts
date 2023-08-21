import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 11 Upload File - Firebase Storage';

  constructor(private sessionService : SessionService,private router : Router)
  {
    
  }

  logout()
  {
    let user = JSON.parse(this.sessionService.getSession('registerdUser'))
    user.is_logged_in = false;
    this.sessionService.setSession('registerdUser',JSON.stringify(user))
    this.router.navigate(['/'])
  }

  checkLoggin()
  {
    let user = JSON.parse(this.sessionService.getSession('registerdUser'))
    return user.is_logged_in 
  }
}
