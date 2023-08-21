import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
 
  constructor(private formBuilder: FormBuilder,private sessionService : SessionService,private router : Router,private toast : ToastrManager) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        mobile: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]]
      },
  
    );
  }

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    let new_user : boolean = true;
    if(this.sessionService.getSession('registerdUser'))
    {
      let user = JSON.parse(this.sessionService.getSession('registerdUser'))

      if(user.mobile == this.registerForm?.get('mobile')?.value)
      {
        new_user = false
      }
      else{
        new_user = true
      }
    }

    let user = {
      mobile : this.registerForm?.get('mobile')?.value,
      name : '',
      email : '',
      address : '',
      date_of_birth : '',
      otp : environment.otp,
      is_new_user : new_user,
      is_logged_in : false
    }
    
    this.sessionService.setSession("registerdUser",JSON.stringify(user));
    this.toast.successToastr('Otp send on registerd mobile number or use otp 123456!', 'Oops!', { position: 'bottom-right', showCloseButton: true, animate: 'slideFromTop' })      
    this.router.navigate(['/verify-otp'])
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  numberOnly(event : any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      return false;
    }
    return true;
  }

 
}
