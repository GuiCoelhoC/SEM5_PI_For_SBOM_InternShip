import { Component } from '@angular/core';
import {FloorService} from "../../../service/FloorService";
import {Building} from "../../../interface/building";
import {BuildingService} from "../../../service/BuildingService";
import {Floor} from "../../../interface/floor";
import {map} from "rxjs";

@Component({
  selector: 'app-update-floor',
  templateUrl: './update-floor.component.html',
  styleUrls: ['./update-floor.component.css']
})
export class UpdateFloorComponent {

  buildings: Building[] = [];

  floors: Floor[] = [];

  buildingSelected : Building | undefined;

  floorSelected : Floor | undefined;

  constructor(private floorService : FloorService,private buildingService: BuildingService) { }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.buildingService.listBuildings().subscribe((data: Building[]) => {
      this.buildings = data;
    });
  }

  updateFloor(){
    console.log("2");
    const newNumberfloor = (<HTMLInputElement>document.getElementById('floatingNewFloorNumber')).value;
    console.log("3");
    const description = (<HTMLInputElement>document.getElementById('floatingFloorDescription')).value;

    console.log("4");
    if (this.buildingSelected == undefined || this.floorSelected == undefined){
      alert('Please select building and a floor!');
      return;
    } else {
      console.log("5");
      this.floorService.updateFloor(this.floorSelected.floorNumber, newNumberfloor, description, this.buildingSelected.code);
    }
  }

  onSelectBuilding() {
    console.log("onSelectBuilding");
    if (this.buildingSelected){
      this.floorService.getFloorList(this.buildingSelected.code)
        .pipe(
          map((response: any) => response._value)
        )
        .subscribe((floorlist: Floor[]) => {
          this.floors = floorlist;
        });
    }
  }
}
