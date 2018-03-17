import { Equipment } from "./equipment.domain";

export class Scheduler {
    schedulerId: number;
    customerUserName: string;
    equipmentId: number;
    fromDate: Date;
    toDate: Date;
    fromTime: string;
    toTime: string;
    status: string;
    equipment:Equipment;
}