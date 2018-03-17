import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Fees } from "./fees.domain";
import { AdminBackEndService } from "./backend.service";
import { ApiMessage } from "../share/api.message.domain";
import { User } from "./user.domian";
import { MenuBarSerivce } from "../share/share.service";
import { DatePipe } from '@angular/common'
// import { Angular2Csv } from 'angular2-csv/Angular2-csv';
@Component({
    templateUrl: './fees.html',
    providers: [AdminBackEndService]
})
export class FeesComponent implements OnInit {
    viewName: string;
    feesData: FormGroup;
    message: ApiMessage;
    showMessage: boolean = false;
    customerList: User[];
    feesList: Fees[];
    feesListInfo: Fees[];
    todayDate: Date = new Date();
    fromDate: string;
    toDate: string;
    amount: number;
    constructor(private datePipe: DatePipe, private _adminService: AdminBackEndService, public menuShow: MenuBarSerivce) { }
    ngOnInit() {
        this.menuShow.showAdminItems();
        this.feesData = new FormGroup({
            customerUserName: new FormControl("", Validators.required),
            subscriptionType: new FormControl("", Validators.required),
            durationFrom: new FormControl('', Validators.required),
            durationTo: new FormControl('', Validators.required),
            amount: new FormControl(0, [Validators.required, Validators.min(10)]),
            status: new FormControl("active")
        });
        this._adminService.fetchActiveCustomer()
            .subscribe((result: User[]) => {
                this.customerList = result;
            });
        this.feesAlertHistory("experied");
    }
   
    dateAutoPopulate(val) {
        this.fromDate = this.datePipe.transform(this.todayDate, "yyyy-MM-dd");
        if (val == '30') {
            this.amount = 250
            this.toDate = this.datePipe.transform(this.todayDate.setDate(this.todayDate.getDate() + 30), "yyyy-MM-dd");
        } else if (val == '90') {
            this.amount = 700
            this.toDate = this.datePipe.transform(this.todayDate.setDate(this.todayDate.getDate() + 90), "yyyy-MM-dd");
        } else if (val == '180') {
            this.amount = 1400
            this.toDate = this.datePipe.transform(this.todayDate.setDate(this.todayDate.getDate() + 180), "yyyy-MM-dd");
        }
    }
    payFees(formData: Fees) {
        this._adminService.submitFees(formData).subscribe((result: Object) => {
            this.message = new ApiMessage().formJSON(result);
            this.showMessage = true;
            this.feesAlertHistory("experied");
        });
    }
    feesAlertHistory(reportType: string) {
        this._adminService.fetchFeesAlertHistory(reportType).subscribe((result: Fees[]) => {
            this.feesList = result;
        });
    }
    userFeesDetails(username: string) {
        this._adminService.fetchUserFeesDetails(username).subscribe((result: Fees[]) => {
            this.feesListInfo = result;
            if (result.length > 0) {
                this.viewName = this.customerList.find(data => data.userName == result[0].customerUserName).customer.customerName;
            } else {

            }
        });
    }
    feesReport(reportType) {
        this.feesAlertHistory(reportType);
    }
}