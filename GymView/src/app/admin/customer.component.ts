import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Customer } from "./customer.domain";
import { AdminBackEndService } from "./backend.service";
import { ApiMessage } from "../share/api.message.domain";
import { User } from "./user.domian";
import { FormArray } from "@angular/forms/src/model";
import { MenuBarSerivce } from "../share/share.service";


@Component({
    templateUrl: './customer.html',
    providers: [AdminBackEndService]
})
export class CustomerRegistration implements OnInit {
    formTitleLabel: string = "New Customer Registeration";
    formData: FormGroup;
    message: ApiMessage;
    showMessage: boolean = false;
    customerList: User[];
    constructor(private _adminService: AdminBackEndService,public menuShow: MenuBarSerivce) { }
    ngOnInit() {
        this.menuShow.showAdminItems();
        this.formData = new FormGroup({
            userName: new FormControl("", [Validators.required]),
            userType: new FormControl("User"),
            status: new FormControl('active'),
            customer: new FormGroup({
                customerName: new FormControl('', [Validators.required]),
                dob: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                gender: new FormControl('Female'),
                contactNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
                address: new FormControl('', [Validators.required])
            })
        });
        this.getCustomerList();
    }
    register(newCusdata: User) {
        console.log("Entered");
        if (this.formData.valid) {
            this._adminService.submitNewCustomer(newCusdata)
                .subscribe((result: Object) => {
                    this.message = new ApiMessage().formJSON(result);
                    this.showMessage = true;
                    this.getCustomerList();
                });
        }

    }
    getCustomerList() {
        this._adminService.fetchActiveCustomer()
            .subscribe((result: User[]) => {
                this.customerList = result;
                console.log(this.customerList);
            });
    }

}