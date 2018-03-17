import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response, RequestMethod } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Login } from "./login.domain";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { User } from "../admin/user.domian";

@Injectable()
export class LoginService {
    url: string = "http://localhost:2018/login";
    constructor(private _http: Http) { }

    loginValidate(loginCredential: Login) : Observable<User>{
        return this._http.post(this.url, loginCredential)
            .map(result => result.json()).catch(this.handleErrorObservable);
    }
    private extractData(res: Response) {
        console.log("Logging the Response" + res);
        let body = res.json();
        return body;
    }

    handleErrorObservable(error: Response | any) {
        // console.error("Suresh Exception : " + error.message || error);
        return Observable.throw(error.message || error);
    }
}