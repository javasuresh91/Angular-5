import { Injectable } from "@angular/core";

@Injectable()
export class MenuBarSerivce {
    userVisible: boolean = false;
    adminVisible: boolean = false;
    showAdminItems() {
        this.adminVisible = true;
        this.userVisible = false;
    }
    showUserItems() {
        this.adminVisible = false;
        this.userVisible = true;
    }
    disableAll() {
        this.userVisible = false;
        this.adminVisible = false;
    }
}