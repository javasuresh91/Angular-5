import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { UserBackEndService } from "./user.backend.service";
import { Fees } from "../admin/fees.domain";
import { MenuBarSerivce } from "../share/share.service";


@Component({
    templateUrl: './payment.html',
    providers: [UserBackEndService]
})
export class PaymentComponent implements OnInit {
    constructor(private _userService: UserBackEndService, public menuShow: MenuBarSerivce) { }
    feesHistoryList: Fees[];
    ngOnInit() {
        this.menuShow.showUserItems();
        this._userService.paymentHistory(window.sessionStorage.getItem("userName"))
            .subscribe((result: Fees[]) => {
                this.feesHistoryList = result;
            });
    }



}