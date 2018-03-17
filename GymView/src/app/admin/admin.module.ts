import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin.home.component';
import { CustomerRegistration } from './customer.component';
import { EquipmentComponent } from './equipment.component';
import { SchedulerComponent } from './scheduler.component';
import { FeesComponent } from './fees.component';
import { MenuBarSerivce } from '../share/share.service';

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      { path: 'adminHome', component: AdminHomeComponent },
      { path: 'newCustomerRegister', component: CustomerRegistration },
      { path: 'addEquipment', component: EquipmentComponent },
      { path: 'timeSlot', component: SchedulerComponent },
      { path: 'feesPortal', component: FeesComponent },     
    ])
  ],
  declarations: [
    AdminHomeComponent,
    CustomerRegistration,
    EquipmentComponent,
    SchedulerComponent,
    FeesComponent
  ],

})
export class AdminModule { }
