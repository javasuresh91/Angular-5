import { Injectable } from "@angular/core";


@Injectable() 
export class ShareComponent {
    constructor() {}
    
    public localStorageItem(): string {
        console.log("ccc "+sessionStorage.getItem("sessionStatus"));
        return sessionStorage.getItem("sessionStatus");
    }
}