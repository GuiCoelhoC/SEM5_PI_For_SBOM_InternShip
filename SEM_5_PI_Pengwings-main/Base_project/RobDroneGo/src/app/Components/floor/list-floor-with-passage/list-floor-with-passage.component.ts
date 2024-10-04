import { Component } from '@angular/core';
import {FloorService} from "../../../service/FloorService";
import {Building} from "../../../interface/building";
import {Floor} from "../../../interface/floor";
import {map} from "rxjs";
import {BuildingService} from "../../../service/BuildingService";
@Component({
  selector: 'app-list-floor-with-passage',
  templateUrl: './list-floor-with-passage.component.html',
  styleUrls: ['./list-floor-with-passage.component.css']
})
export class ListFloorWithPassageComponent {
  floorList : Floor[] = [];
buildingList : Building[] = [];
selectedBuilding : Building | undefined;
  constructor(private floorService : FloorService,private buildingService: BuildingService) { }
  ngOnInit(): void {
    this.buildingService.listBuildings().subscribe((buildings: Building[]) => {
      this.buildingList = buildings;
    });
  }

  getAllFloorListWithPassageFromBuilding(){
    if (this.selectedBuilding){
      this.floorList = [];
      this.floorService.getFloorListWithPassage(this.selectedBuilding.code)
        .pipe(
          map((response: any) => response._value)
        )
        .subscribe((floors: Floor[]) => {
          this.floorList = floors;
        });
    }
  }

}
