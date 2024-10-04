import { Component } from '@angular/core';
import {ElevatorService} from "../../../service/elevator-service/elevator.service";
import {Building} from "../../../interface/building";
import {BuildingService} from "../../../service/BuildingService";
import {FloorService} from "../../../service/FloorService";
import {Floor} from "../../../interface/floor";
import {map} from "rxjs";
@Component({
  selector: 'app-create-elevator',
  templateUrl: './create-elevator.component.html',
  styleUrls: ['./create-elevator.component.css']
})
export class CreateElevatorComponent {

  buildings: Building[] = [];
  buildingSelected: Building | undefined;
  buildingFloors: Floor[] = [];
  selectedFloors: Floor[] = [];

  constructor(private elevatorService : ElevatorService, private buildingService: BuildingService, private floorService: FloorService) { }

  ngOnInit(): void {
    this.buildingService.listBuildings().subscribe((data: Building[]) => {
      this.buildings = data;
    });
  }

  onSelectedBuilding(){
    if (this.buildingSelected){
      this.floorService.getFloorList(this.buildingSelected.code)
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

  onCreate(){
    console.log("Creating elevator...");
    const building = this.buildingSelected?.code;
    if (building == undefined){
      alert("Please select a building!");
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
    this.elevatorService.createElevator(building, floors, brand, model, serialNumber, description);
  }


}
