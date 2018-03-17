export class Login {
    userName: string;
    password: string;
    userType : string;

    fromJSON(jsonString) {
        for (var propName in jsonString) {
            console.log("propName : "+propName);
            this[propName] = jsonString[propName];
        }
        return this;
    }
}