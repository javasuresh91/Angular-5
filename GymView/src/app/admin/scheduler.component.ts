import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AdminBackEndService } from "./backend.service";
import { Customer } from "./customer.domain";
import { Equipment } from "./equipment.domain";
import { User } from "./user.domian";
import { Scheduler } from "./scheduler.domain";
import { ApiMessage } from "../share/api.message.domain";
import { MenuBarSerivce } from "../share/share.service";
import { Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";


@Component({
    templateUrl: './scheduler.html',
    providers: [AdminBackEndService]
})
export class SchedulerComponent implements OnInit {
    addScheduleForm: FormGroup;
    customerList: User[];
    equipmentList: Equipment[];
    message: ApiMessage;
    showMessage: boolean = false;
    schedulerList: Scheduler[];
    todayDate: Date;
    flagOne: boolean = false;
    flagTwo: boolean = false;
    customerNameDropDown: string = "";
    equipmentNameDropDown: string = "";
    dateReport: Date;
    today = Date.now();
    selectReport:string = "todaySchedule";
    constructor(private datePipe: DatePipe, private _adminService: AdminBackEndService, public menuShow: MenuBarSerivce) {
        this.menuShow.showAdminItems();
        this.addScheduleForm = new FormGroup({
            customerUserName: new FormControl("", Validators.required),
            "equipmentId": new FormControl("", Validators.required),
            "fromDate": new FormControl('', Validators.required),
            "toDate": new FormControl('', Validators.required),
            "fromTime": new FormControl('', Validators.required),
            "toTime": new FormControl('', Validators.required),
            "status": new FormControl("active")
        });
    }

    ngOnInit() {
        this._adminService.fetchActiveEquipment()
            .subscribe((result: Equipment[]) => {
                this.equipmentList = result;
            });
        this._adminService.fetchActiveCustomer()
            .subscribe((result: User[]) => {
                this.customerList = result;
            });
        this.todayScheduleHistory();
    }

    createSchedule(formData: Scheduler) {
        this._adminService.submitScheduler(formData).subscribe((result: Object) => {
            this.message = new ApiMessage().formJSON(result);
            this.showMessage = true;
            this.todayScheduleHistory();
        });

    }
    scheduleReport() {
        if (this.selectReport == 'todaySchedule') {
            this.flagOne = false;
            this.flagTwo = false;
            this.todayScheduleHistory();
        } else if (this.selectReport == 'userSchedule') {
            this.flagOne = true;
            this.flagTwo = false;
            if(this.customerNameDropDown !="")
            this._adminService
                .fetchSchudulerBasedOnFilter("user", this.customerNameDropDown, this.dateReport + "")
                .subscribe((result: Scheduler[]) => {
                    this.schedulerList = result;
                });
        } else if (this.selectReport == 'equipmentSchedule') {
            this.flagOne = false;
            this.flagTwo = true;
            if(this.equipmentNameDropDown!="")
            this._adminService
                .fetchSchudulerBasedOnFilter("equipment", this.equipmentNameDropDown, this.dateReport + "")
                .subscribe((result: Scheduler[]) => {
                    this.schedulerList = result;
                });
        }
    }
    resetDropDown(val: string) {
        this.customerNameDropDown = "";
        this.equipmentNameDropDown = "";
        this.dateReport = undefined;
        this.schedulerList=[];
        this.selectReport = val;
    }
    todayScheduleHistory() {
        this._adminService.fetchTodaySchedulerHistory(this.datePipe.transform(new Date(), "yyyy-MM-dd")).subscribe((result: Scheduler[]) => {
            this.schedulerList = result;
            console.log(this.schedulerList);
        });
    }


}