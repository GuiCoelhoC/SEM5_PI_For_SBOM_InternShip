import { Component } from '@angular/core';
import { BuildingService } from 'src/app/service/BuildingService';

@Component({
  selector: 'app-building-create',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent {
  constructor(private BuildingService: BuildingService) { }

  createBuilding() {
    const code = (<HTMLInputElement>document.getElementById('floatingBuildingCode')).value;
    const name = (<HTMLInputElement>document.getElementById('floatingBuildingName')).value;
    const description = (<HTMLInputElement>document.getElementById('floatingBuildingDescription')).value;
    const widthMax = (<HTMLInputElement>document.getElementById('floatingBuildingWidthMax')).value;
    const lengthMax = (<HTMLInputElement>document.getElementById('floatingBuildingLengthMax')).value;

    console.log(code);
    console.log(name);
    console.log(description);
    console.log(widthMax);
    console.log(lengthMax);
    
    if (this.isValid(code)) {
      this.BuildingService.createBuilding(code, name, description, widthMax, lengthMax);
    } else {
      alert('Invalid Building Code!');
    }
    
  }
  isValid(value: string): boolean {
    return value.length <= 5;
  }
}
