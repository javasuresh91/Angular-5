export class ApiMessage {
    message: string;

    formJSON(jsonString) {
        for (var para in jsonString) {
            this[para] = jsonString[para];
        }
        return this;
    }
}