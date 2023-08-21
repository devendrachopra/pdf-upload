import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  submitted = false;
  maxBirthDate!: string;

  constructor(private formBuilder : FormBuilder,private sessionService : SessionService,private toastr : ToastrManager,private router : Router) { }

  ngOnInit(): void {
    let auxDate = this.substractYearsToDate(new Date(), 18);
    this.maxBirthDate = this.getDateFormateForSearch(auxDate);
    this.profileForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
        dob : ['',[Validators.required]]
      },
   
    );

    if(this.sessionService.getSession('registerdUser'))
    {
      let user = JSON.parse(this.sessionService.getSession('registerdUser'))
      this.profileForm.controls['name']?.setValue(user?.name ? user?.name :'');
      this.profileForm.controls['email']?.setValue(user?.email ? user?.email :'');
      this.profileForm.controls['address']?.setValue(user?.address ? user?.address :'');
      this.profileForm.controls['dob']?.setValue(user?.date_of_birth ? user?.date_of_birth :'');
    }
  }
  get f() { return this.profileForm.controls; }
  onSubmit()
  {
    this.submitted =true
    if(this.profileForm.invalid)
    {
      return;
    }

    console.log(this.profileForm.value);
    let registerUser = JSON.parse(this.sessionService.getSession('registerdUser'))
    registerUser.name =  this.profileForm.get('name')?.value
    registerUser.address =  this.profileForm.get('address')?.value
    registerUser.email =  this.profileForm.get('email')?.value
    registerUser.date_of_birth =  this.profileForm.get('dob')?.value

    this.sessionService.setSession('registerdUser',JSON.stringify(registerUser))
    this.toastr.successToastr('Profile updated Successfully!', 'Oops!', { position: 'bottom-right', showCloseButton: true, animate: 'slideFromTop' })      
    this.router.navigate(['/dashboard'])
  }

  substractYearsToDate(auxDate: Date, years: number): Date {
    auxDate.setFullYear(auxDate.getFullYear() - years);
    return auxDate;
  }


  getDateFormateForSearch(date: Date): string {
    let year = date.toLocaleDateString('es', { year: 'numeric' });
    let month = date.toLocaleDateString('es', { month: '2-digit' });
    let day = date.toLocaleDateString('es', { day: '2-digit' });
    return `${year}-${month}-${day}`;
  }
}
