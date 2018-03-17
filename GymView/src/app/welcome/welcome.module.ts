import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { HttpModule } from '@angular/http';
@NgModule({
  imports: [
    CommonModule,
    //ShareModule,
    HttpModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent }
    ])    
  ],

  declarations: [HomeComponent]
})
export class WelcomeModule { }
