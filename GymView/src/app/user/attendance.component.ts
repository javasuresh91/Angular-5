import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { Attendance } from "./attendance.domain";
import { UserBackEndService } from "./user.backend.service";
import { ApiMessage } from "../share/api.message.domain";
import { MenuBarSerivce } from "../share/share.service";
@Component({
    templateUrl: './attendance.html',
    providers: [DatePipe, UserBackEndService]
})
export class AttendanceComponent implements OnInit {
    private formData: FormGroup;
    private label: string = "Check In";
    today = Date.now();
    message: any;
    showMessage: boolean = false;
    timeSheetHistory: Attendance[];
    constructor(private datePipe: DatePipe, private backendService: UserBackEndService,public menuShow: MenuBarSerivce) {
        this.formData = new FormGroup({
            "checkType": new FormControl('checkIn'),
            // "dateTime": new FormControl({ value: this.datePipe.transform(this.today, 'dd-MM-yyyy HH:mm:ss'), disabled: true }),
            "dateTime": new FormControl(this.datePipe.transform(this.today, 'dd-MM-yyyy HH:mm:ss'))
        });
    }
    ngOnInit() {
        this.menuShow.showUserItems();
        this.getTimeSheetHistory(-5);
    }
    getTimeSheetHistory(days: number) {
        console.log(days);
        this.backendService.timeSheetHistory(days, window.sessionStorage.getItem("userName")).subscribe((result: Attendance[]) => {
            this.timeSheetHistory = result;
            console.log(this.timeSheetHistory);
        });
    }
    labelChange(val) {
        this.label = val;
    }
    saveTimeSheet(form: Attendance) {
        this.today = Date.now();
        form.logDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
        form.customerUserName = window.sessionStorage.getItem("userName");
        if (form.checkType == 'checkIn') {
            form.logInTime = this.datePipe.transform(this.today, 'HH:mm:ss');
        } else {
            form.logOutTime = this.datePipe.transform(this.today, 'HH:mm:ss');
        }
        console.log(form.customerUserName+" "+form.logDate + " " + form.checkType + " " + form.dateTime + " " + form.logOutTime);
        this.backendService.timeSheetEntry(form).subscribe((result: object) => {
            this.message = new ApiMessage().formJSON(result);
            console.log(this.message);
            this.showMessage = true;
            this.getTimeSheetHistory(-5);
        });
    }


}