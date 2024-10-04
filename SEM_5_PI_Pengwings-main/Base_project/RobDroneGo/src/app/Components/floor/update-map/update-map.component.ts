import { Component } from '@angular/core';
import { Floor } from 'src/app/interface/floor';
import { Building } from 'src/app/interface/building';
import { FloorService } from 'src/app/service/FloorService';
import { BuildingService } from 'src/app/service/BuildingService';
import { map } from 'rxjs';

@Component({
  selector: 'app-update-map',
  templateUrl: './update-map.component.html',
  styleUrls: ['./update-map.component.css']
})
export class UpdateMapComponent {
  
  floors: Floor[] = [];
  buildings: Building[] = [];
  floorSelected : Floor | undefined;
  buildingSelected : Building | undefined;

  constructor(private floorService : FloorService, private buildingService : BuildingService) { }

  ngOnInit(): void {
    this.buildingService.listBuildings().subscribe((data: Building[]) => {
      this.buildings = data;
    });
  }

  updateMap(){
  }

  onSelectBuilding() {
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
