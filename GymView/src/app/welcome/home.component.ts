import { Component, OnInit } from "@angular/core";
import { ShareComponent } from "../share/share.component";
import { MenuBarSerivce } from "../share/share.service";


@Component({
    // selector: 'homePage',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
    sideMenuAdmin : boolean = true;
    sideMenuUser : boolean = true;
    constructor(public app: ShareComponent, public menuShow: MenuBarSerivce) {
        this.menuShow.disableAll();
        
    }
    ngOnInit() {
        if(window.sessionStorage.getItem("sideMenu") == "admin") {
            this.sideMenuAdmin = true;
            this.sideMenuUser = false;
        } else if(window.sessionStorage.getItem("sideMenu") == "user") {
            this.sideMenuAdmin = false;
            this.sideMenuUser = true;
        }
    }
}