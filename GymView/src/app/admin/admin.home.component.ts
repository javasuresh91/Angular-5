import { Component } from "@angular/core";
import { MenuBarSerivce } from "../share/share.service";

@Component({
    templateUrl: './admin.home.html'
    // template : '<a routerLink="/login">hai</a>'
})
export class AdminHomeComponent {
    sideMenuAdmin: boolean = false;
    sideMenuUser: boolean = false;
    constructor(public menuShow: MenuBarSerivce) {
        this.menuShow.showAdminItems();
    }


}