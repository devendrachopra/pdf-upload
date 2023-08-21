import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { NgxOtpInputConfig,NgxOtpInputComponent } from 'ngx-otp-input';
import { environment } from 'src/environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {

  submitted = false;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    isPasswordInput : true,
    autoblur :true,
    numericInputMode : true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };

  @ViewChild('ngxotp') ngxOtp!: NgxOtpInputComponent;
  
  otpChangeResult :String[]= [];
  fillResult : string = '';
  display: any;
  resendOtp: boolean = false;
  displayTimer: boolean = false;
  constructor(private readonly cdr: ChangeDetectorRef,private toastr : ToastrManager,private sessionService : SessionService,private router : Router) {}

  ngOnInit() {
    if(!this.sessionService.getSession('registerdUser'))
    {
      this.router.navigate(['/'])
      return;
    } 
    this.start(1)
  }
  onSubmit() {
    this.submitted = true;
    if(this.resendOtp)
    {
      this.toastr.errorToastr('Otp expired please click on resend otp button to get new otp!', 'Oops!', { position: 'bottom-right', showCloseButton: true, animate: 'slideFromTop' })
      return;
    }
    if(this.otpChangeResult.length == 6 && this.fillResult.length == 6)
    {
      let otp : any = environment.otp;
      if(this.fillResult == otp)
      {
        let registerUser =  JSON.parse(this.sessionService.getSession('registerdUser'));
        registerUser.is_logged_in = true;
        this.sessionService.setSession('registerdUser',JSON.stringify(registerUser))
        this.router.navigate(['/dashboard'])
       
        this.toastr.successToastr('Otp Veify Successfully!', 'Oops!', { position: 'bottom-right', showCloseButton: true, animate: 'slideFromTop' })      
      }
      else{
        this.toastr.errorToastr('Inavlid Otp!', 'Oops!', { position: 'bottom-right', showCloseButton: true, animate: 'slideFromTop' })
      }
    }
    
    
  }

  clear(): void {
    this.ngxOtp.clear();
  }



  handeOtpChange(value: string[]): void {
    this.otpChangeResult =value.join('').split('');
    this.cdr.detectChanges();
  }

  handleFillEvent(value: string): void {
    this.fillResult = value;
  }

  start(minute : any) {
    this.displayTimer = true;
    this.resendOtp = false;
    let seconds = minute * 60;
    let textSec: any = '0';
    let statSec = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;
      if (statSec < 10) {
        textSec = '0' + statSec;
      } else {
        textSec = statSec;
      }
      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
        this.resendOtp = true;
        this.displayTimer = false;
      }
    }, 1000);
  }

  resend()
  {
    this.start(1)
  }
}
