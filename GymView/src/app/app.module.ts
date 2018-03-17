import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeModule } from './welcome/welcome.module';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { ShareComponent } from './share/share.component';
import { UserModule } from './user/user.module';
import { MenuBarSerivce } from './share/share.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]),
    WelcomeModule,
    LoginModule,
    AdminModule,
    UserModule
  ],
  providers: [ShareComponent,MenuBarSerivce],
  bootstrap: [AppComponent]
})
export class AppModule { }
