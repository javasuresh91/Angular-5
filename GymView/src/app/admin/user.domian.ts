import { Customer } from "./customer.domain";

export class User {
    userName: string;
    userType:string;
    status:string;
    customer : Customer;
}