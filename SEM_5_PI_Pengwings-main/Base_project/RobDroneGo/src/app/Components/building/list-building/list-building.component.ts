import { Component } from '@angular/core';
import { BuildingService } from 'src/app/service/BuildingService';
import { Building } from 'src/app/interface/building';

@Component({
  selector: 'app-building-list',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css']
})
export class ListBuildingComponent {
  buildings: Building[] = [];

  constructor(private buildingService : BuildingService) { }

  ngOnInit() {
    this.buildingService.listBuildings().subscribe((buildings: Building[]) => {
      this.buildings = buildings;
    });
  }

}
