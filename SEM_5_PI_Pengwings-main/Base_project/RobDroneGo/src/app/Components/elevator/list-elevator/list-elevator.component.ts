import { Component } from '@angular/core';
import {ElevatorService} from "../../../service/elevator-service/elevator.service";
import {Elevator} from "../../../interface/elevator";
import {map} from "rxjs";
import {FloorService} from "../../../service/FloorService";
import {Building} from "../../../interface/building";
import {BuildingService} from "../../../service/BuildingService";

@Component({
  selector: 'app-list-elevator',
  templateUrl: './list-elevator.component.html',
  styleUrls: ['./list-elevator.component.css']
})
export class ListElevatorComponent {

  elevators : Elevator[] = [];
  buildingList : Building[] = [];
  building : Building | undefined;

  constructor(private elevatorService : ElevatorService, private buildingService : BuildingService ,private floorService : FloorService) { }

  ngOnInit(): void {
    this.getBuildingList();
  }

  getBuildingList(){
    this.buildingService.listBuildings().subscribe((buildings: Building[]) => {
      this.buildingList = buildings;
    });
  }

  onList(){
    if(this.building) {
      this.elevators = [];
      this.elevatorService.listElevatorByBuilding(this.building.code)
        .pipe(
          map((response: any) => response._value)
        )
        .subscribe((elevators: Elevator[]) => {
          this.elevators = elevators;
        });
      console.log("Elevators: " +this.elevators);
    }
    //alert("Elevators listed successfully!")
  }

}
