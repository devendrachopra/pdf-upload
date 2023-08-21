import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { GuestGuard } from './guard/guest.guard';
import { RegisterComponent } from './components/register/register.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
const routes: Routes = [
    {
        path : '',
        component : RegisterComponent,
        canActivate : [GuestGuard]
    },
    {
        path : 'verify-otp',
        component :VerifyOtpComponent,
        canActivate : [GuestGuard]
    },
    {
        path : 'dashboard',
        component : UploadListComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'add-file',
        component : UploadFormComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'edit-profile',
        component : EditProfileComponent,
        canActivate : [AuthGuard]
    },
    {
        path : '**',
        redirectTo : ''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
