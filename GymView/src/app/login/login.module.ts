import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
    ]),
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
