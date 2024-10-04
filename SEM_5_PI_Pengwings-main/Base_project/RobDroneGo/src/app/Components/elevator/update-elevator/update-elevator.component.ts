import { Component } from '@angular/core';
import {ElevatorService} from "../../../service/elevator-service/elevator.service";
import {map} from "rxjs";
import {Floor} from "../../../interface/floor";
import {FloorService} from "../../../service/FloorService";
import {Elevator} from "../../../interface/elevator";

@Component({
  selector: 'app-update-elevator',
  templateUrl: './update-elevator.component.html',
  styleUrls: ['./update-elevator.component.css']
})
export class UpdateElevatorComponent {


  elevators: Elevator[] = [];
  elevatorSelected: Elevator | undefined;
  buildingFloors: Floor[] = [];
  selectedFloors: Floor[] = [];
    constructor(private elevatorService : ElevatorService, private floorService : FloorService) { }

    ngOnInit(): void {
      this.elevatorService.listElevators().subscribe((data: Elevator[]) => {
        this.elevators = data;
      });
    }

  onSelectedElevator(){
    if (this.elevatorSelected){
      this.floorService.getFloorList(this.elevatorSelected.code?.split("-")[0] as string)
        .pipe(
          map((response: any) => response._value)
        )
        .subscribe((floors: Floor[]) => {
          this.buildingFloors = floors;
        });
      console.log("Floors: " + this.buildingFloors);
    }
  }

  updateSelectedFloors(index: number) {
    const floor = this.buildingFloors[index];
    if (!this.selectedFloors.includes(floor)) {
      console.log("Adding floor: " + floor.floorNumber);
      this.selectedFloors.push(floor);
    } else {
      console.log("Removing floor: " + floor.floorNumber);
      this.selectedFloors = this.selectedFloors?.filter(f => f !== floor);
    }
  }
    onUpdate() {
        console.log("Updating elevator...");
      const code = this.elevatorSelected?.code;
      if (code == undefined){
        alert("Please select an elevator!");
        return;
      }

      const floors : number[] = [];
      this.selectedFloors?.forEach(item => {
        if (item?.floorNumber != null) {
          floors.push(item?.floorNumber);
        }
      });
      if (floors.length == 0){
        alert("Please select at least one floor!");
        return;
      }
      const brand = (<HTMLInputElement>document.getElementById('brand')).value;
      const model = (<HTMLInputElement>document.getElementById('model')).value;
      const serialNumber = (<HTMLInputElement>document.getElementById('serialNumber')).value;

      const description = (<HTMLInputElement>document.getElementById('description')).value;

      if (model !== undefined && serialNumber == undefined){
        alert("Please insert serial number when inserting model!");
        return;
      }
      this.elevatorService.updateElevator(code, floors, brand, model, serialNumber, description);

    }
}
