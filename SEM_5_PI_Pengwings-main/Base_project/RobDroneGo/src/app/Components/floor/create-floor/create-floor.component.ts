import { Component } from '@angular/core';
import {FloorService} from "../../../service/FloorService";
import {BuildingService} from "../../../service/BuildingService";
import {Building} from "../../../interface/building";

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent {

  constructor(private floorService: FloorService, private buildingService: BuildingService) {
  }

  buildings: Building[] = [];
  buildingSelected: Building | undefined;

  ngOnInit(): void {
    this.buildingService.listBuildings().subscribe((data: Building[]) => {
      this.buildings = data;
    });
  }

  createFloor(){
    const numberfloor = (<HTMLInputElement>document.getElementById('floatingFloorNumber')).value;
    const description = (<HTMLInputElement>document.getElementById('floatingFloorDescription')).value;
    const length = (<HTMLInputElement>document.getElementById('floatingFloorLength')).value;
    const width = (<HTMLInputElement>document.getElementById('floatingFloorWidth')).value;
    if (this.buildingSelected == undefined){
      alert('Please select building!');
      return;
    } else 
    this.floorService.createFloor(numberfloor, description, length, width, this.buildingSelected.code);
  }

}
