import { Component, OnInit } from "@angular/core";
import { Login } from "./login.domain";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { LoginService } from "./login.service";
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { User } from "../admin/user.domian";
import { MenuBarSerivce } from "../share/share.service";

@Component({
    templateUrl: './login.component.html',
    providers: [LoginService]
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loginResult: User;
    constructor(private _fb: FormBuilder, private _login: LoginService, private _pageRoute: Router, public menuShow: MenuBarSerivce) {
        this.menuShow.disableAll();
        console.log("Constructor Insitated");
    }

    ngOnInit() {
        console.log("Form Started to Insitated");
        this.form = new FormGroup({
            userName: new FormControl('admin'),
            password: new FormControl('admin')
        });
        // this.form = this._fb.group({
        //     userName: ['admin'],
        //     password: ['']
        // });
        console.log("Form Insitated Completed" + this.form);
    }

    onLogin(formData: Login) {
        this._login.loginValidate(formData).subscribe((resultFlag: User) => {
            this.loginResult = resultFlag;
            console.log(this.loginResult.userName);
            if (this.loginResult.userType.match("master")) {
                this._pageRoute.navigate(['/adminHome']);
            } else if (this.loginResult.userType.match("User")) {
                window.sessionStorage.setItem("userName",this.loginResult.userName);
                this._pageRoute.navigate(['/userHome']);
            }
            else {
                this._pageRoute.navigate(['/login']);
            }
        });
    }
}