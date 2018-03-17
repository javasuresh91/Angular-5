import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminBackEndService } from "./backend.service";
import { Equipment } from "./equipment.domain";
import { ApiMessage } from "../share/api.message.domain";
import { MenuBarSerivce } from "../share/share.service";



@Component({
    templateUrl: './equipment.html',
    providers: [AdminBackEndService]
})
export class EquipmentComponent implements OnInit {
    count: number = 1;
    addFormData: FormGroup;
    editFormData: FormGroup;
    message: ApiMessage;
    alterMessage: ApiMessage;
    equipmentList: Equipment[];
    private rowdata: Equipment;
    showMessage: boolean = false;
    altershowMessage: boolean = false;
    constructor(private _adminService: AdminBackEndService,public menuShow: MenuBarSerivce) {
        this.menuShow.showAdminItems();
        this.addFormData = new FormGroup({
            "name": new FormControl('', [Validators.required]),
            "qty": new FormControl('', [Validators.required, Validators.min(1)]),
            "status": new FormControl("Active")
        });
        this.editFormData = new FormGroup({
            "name": new FormControl(),
            "qty": new FormControl(),
            "status": new FormControl(),
            "id": new FormControl()
        });

    }
    ngOnInit() {
        this.getAllEquipment();
    }
    addEquipment(formData: Equipment) {
        if (this.addFormData.valid) {
            this._adminService.submitEquipmentData(formData)
                .subscribe((result: Object) => {
                    this.message = new ApiMessage().formJSON(result);
                    this.showMessage = true;
                    this.getAllEquipment();

                });

        }
    }
    updateEquipment(formData: Equipment) {
        console.log("Editing Equipment");
        if (this.editFormData.valid) {
            this._adminService.submitEquipmentData(formData)
                .subscribe((result: Object) => {
                    this.alterMessage = new ApiMessage().formJSON(result);
                    this.altershowMessage = true;
                    this.getAllEquipment();

                });

        }
    }
    populateData(equipmentId: number) {
        this.rowdata = this.equipmentList.find(x => x.id == equipmentId);
        this.editFormData = new FormGroup({
            "name": new FormControl(this.rowdata.name),
            "qty": new FormControl(this.rowdata.qty),
            "status": new FormControl(this.rowdata.status),
            "id": new FormControl(this.rowdata.id)
        });
    }
    getAllEquipment() {
        console.log("Intiail service");
        this._adminService.fetchActiveEquipment()
            .subscribe((result: Equipment[]) => {
                this.equipmentList = result;
                console.log(this.equipmentList);
            });
        console.log("Intiail service Ended");
    }

}