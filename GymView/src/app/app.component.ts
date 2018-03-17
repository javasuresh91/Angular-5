import { Component } from '@angular/core';
import { ShareComponent } from './share/share.component';
import { MenuBarSerivce } from './share/share.service';
// import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GYM Online Portal';
  constructor(public app: ShareComponent, public menuShow: MenuBarSerivce) { }

}
