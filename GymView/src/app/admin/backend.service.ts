import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Customer } from "./customer.domain";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { Equipment } from "./equipment.domain";
import { User } from "./user.domian";
import { Scheduler } from "./scheduler.domain";
import { Fees } from "./fees.domain";

@Injectable()
export class AdminBackEndService {

    apiBaseURL: string = "http://localhost:2018/";

    constructor(private _http: Http) { }

    submitNewCustomer(formData: User) {
        console.log("Customer Data : " + formData.userName);
        return this._http.post(this.apiBaseURL + "saveCustomer", formData)
            .map(result => result.json()).catch(this.handleError);
    }
    fetchActiveCustomer(): Observable<User[]> {
        return this._http.get(this.apiBaseURL + "getAllCustomer")
            .map(result => result.json()).catch(this.handleError);
    }
    submitEquipmentData(formData: Equipment) {
        console.log("Equipment Data : " + formData.name);
        return this._http.post(this.apiBaseURL + "saveEquipment", formData)
            .map(result => result.json()).catch(this.handleError);
    }

    fetchActiveEquipment(): Observable<Equipment[]> {
        return this._http.get(this.apiBaseURL + "getAllEquipment")
            .map(result => result.json()).catch(this.handleError);
    }

    submitScheduler(formData: Scheduler) {
        return this._http.post(this.apiBaseURL + "createSchedule", formData)
            .map(result => result.json()).catch(this.handleError);
    }

    fetchTodaySchedulerHistory(todayDate: string): Observable<Scheduler[]> {
        return this._http.get(this.apiBaseURL + "todaySchedule?date=" + todayDate)
            .map(result => result.json()).catch(this.handleError);
    }
    fetchSchudulerBasedOnFilter(reportType: string, keyName: string, date: string): Observable<Scheduler[]> {
        return this._http.get(this.apiBaseURL + "filerSchedule?reportType=" + reportType + "&keyName=" + keyName + "&date=" + date)
            .map(result => result.json()).catch(this.handleError);
    }
    submitFees(formData: Fees) {
        return this._http.post(this.apiBaseURL + "createPayment", formData)
            .map(result => result.json()).catch(this.handleError)
    }
    fetchFeesAlertHistory(reportType): Observable<Fees[]> {
        return this._http.get(this.apiBaseURL + "feesAlert?reportType=" + reportType)
            .map(result => result.json()).catch(this.handleError);
    }
    fetchUserFeesDetails(uname: string): Observable<Fees[]> {
        return this._http.get(this.apiBaseURL + "userFeesView?uname=" + uname)
            .map(result => result.json()).catch(this.handleError);
    }

    handleError(error: Response | any) {
        return Observable.throw(error || error.message);
    }

    extractResult(result: Response) {
        let body = result.json();
        return body || [];
    }
}