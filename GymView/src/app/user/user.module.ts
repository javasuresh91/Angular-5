import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance.component';
import { PaymentComponent } from './payment.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild([
      { path: 'userHome', redirectTo: 'attendance', pathMatch: 'full' },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'paymentHistory', component: PaymentComponent }

    ])
  ],
  declarations: [
    AttendanceComponent,
    PaymentComponent
  ]
})
export class UserModule { }
