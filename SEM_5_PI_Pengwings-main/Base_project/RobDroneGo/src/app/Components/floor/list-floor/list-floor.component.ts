import { Component } from '@angular/core';
import {FloorService} from "../../../service/FloorService";
import {Building} from "../../../interface/building";
import {Floor} from "../../../interface/floor";
import {map} from "rxjs";
import {BuildingService} from "../../../service/BuildingService";

@Component({
  selector: 'app-list-floor',
  templateUrl: './list-floor.component.html',
  styleUrls: ['./list-floor.component.css']
})
export class ListFloorComponent {

  floorList : Floor[] = [];

  buildingList : Building[] = [];

  selectedBuilding : Building | undefined;


  constructor(private floorService : FloorService,private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.getBuildingList();
  }

  getBuildingList(){
    this.buildingService.listBuildings().subscribe((buildings: Building[]) => {
      this.buildingList = buildings;
    });
  }

  onSelectedBuilding(){
    if (this.selectedBuilding){
      this.floorService.getFloorList(this.selectedBuilding.code)
        .pipe(
          map((response: any) => response._value)
        )
        .subscribe((floors: Floor[]) => {
          this.floorList = floors;
        });
    }
  }
}
