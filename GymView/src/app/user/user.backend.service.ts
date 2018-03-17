import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Attendance } from "./attendance.domain";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'
import { Headers } from "@angular/http";
import { Fees } from "../admin/fees.domain";
@Injectable()
export class UserBackEndService {
    API_URL: string = "http://localhost:2018/";

    constructor(private _http: Http) { }
    timeSheetEntry(entryData: Attendance): Observable<Attendance> {
        return this._http.post(this.API_URL + "attendanceEntry", entryData)
            .map(result => result.json()).catch(this.handleError);
    }
    timeSheetHistory(daysCount: number, uname: string): Observable<Attendance[]> {
        return this._http.get(this.API_URL + "attendanceEntryHistory?daysCount=" + daysCount + "&uname=" + uname)
            .map(result => result.json()).catch(this.handleError);
    }

    paymentHistory(uname: string): Observable<Fees[]> {
        return this._http.get(this.API_URL + "paymentHistory?uname=" + uname)
            .map(result => result.json()).catch(this.handleError);
    }

    handleError(error: Response | any) {
        return Observable.throw(error || error.message);
    }
}