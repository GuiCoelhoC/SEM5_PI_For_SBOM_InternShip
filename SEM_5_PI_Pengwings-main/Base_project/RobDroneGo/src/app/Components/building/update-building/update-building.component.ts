import { Component } from '@angular/core';
import { BuildingService } from 'src/app/service/BuildingService';
import { Building } from 'src/app/interface/building';

@Component({
  selector: 'app-building-update',
  templateUrl: './update-building.component.html',
  styleUrls: ['./update-building.component.css']
})
export class UpdateBuildingComponent {
  constructor(private BuildingService: BuildingService) { }

  buildings: Building[] = [];
  buildingSelected: Building | undefined;

  ngOnInit(): void {
    this.BuildingService.listBuildings().subscribe((data: Building[]) => {
      this.buildings = data;
    });
  }

  updateBuilding() {
    if (this.buildingSelected == undefined) {
      alert('Please select building!');
      return;
    }
    const name = (<HTMLInputElement>document.getElementById('floatingBuildingName')).value;
    const description = (<HTMLInputElement>document.getElementById('floatingBuildingDescription')).value;
    const widthMax = (<HTMLInputElement>document.getElementById('floatingBuildingWidthMax')).value;
    const lengthMax = (<HTMLInputElement>document.getElementById('floatingBuildingLengthMax')).value;

    console.log(this.buildingSelected.code); 
    console.log(name);
    console.log(description);
    console.log(widthMax);
    console.log(lengthMax);
    
    this.BuildingService.updateBuilding(this.buildingSelected.code, name, description, widthMax, lengthMax);
    
  }
}
