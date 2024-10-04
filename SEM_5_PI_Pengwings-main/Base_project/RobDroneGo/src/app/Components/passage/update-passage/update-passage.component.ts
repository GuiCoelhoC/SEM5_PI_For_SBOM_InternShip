import { Component } from '@angular/core';
import {PassageService} from "../../../service/passage-service/passage-service.service";
import {FloorService} from "../../../service/FloorService";
import {Building} from "../../../interface/building";
import {Floor} from "../../../interface/floor";
import {Passage} from "../../../interface/passage";

@Component({
  selector: 'app-update-passage',
  templateUrl: './update-passage.component.html',
  styleUrls: ['./update-passage.component.css']
})
export class UpdatePassageComponent {

  constructor(private passageService : PassageService, private floorService : FloorService) { }


  Passage : Passage[] = [];
  PassageSelected : Passage | undefined;
  buildings: Building[] = [];
  buildingSelected1: Building | undefined;
  buildingSelected2: Building | undefined;
  floors1: Floor[] = [];
  floors2: Floor[] = [];
  floorSelected1: Floor | undefined;
  floorSelected2: Floor | undefined;

  ngOnInit(): void {
    this.passageService.listBuildings().subscribe((data: Building[]) => {
      this.buildings = data;
    });
    this.passageService.passageList().subscribe((data: Passage[]) => {
      this.Passage = data;
    });
    this.floorService.getFloorList(this.buildingSelected1?.code).subscribe((data: Floor[]) => {
      this.floors1 = data;
    });
    this.floorService.getFloorList(this.buildingSelected2?.code).subscribe((data: Floor[]) => {
      this.floors2 = data;
    });
  }

  updatePassage(){
    const code = (<HTMLInputElement>document.getElementById('floatingPassageCode')).value;
    const floor1 = (<HTMLInputElement>document.getElementById('floatingPassageFloor1')).value;
    const floor2 = (<HTMLInputElement>document.getElementById('floatingPassageFloor2')).value;
    const building1 = (<HTMLInputElement>document.getElementById('floatingPassageBuilding1')).value;
    const building2 = (<HTMLInputElement>document.getElementById('floatingPassageBuilding2')).value;

    console.log(code);
    console.log(floor1);
    console.log(floor2);
    console.log(building1);
    console.log(building2);

    if (this.buildingSelected1 == undefined){
      alert('Please select building 1!');
      return;
    } else if(this.buildingSelected2 == undefined){
      alert('Please select building 2!');
      return;
    } else if(this.floorSelected1 == undefined){
      alert('Please select floor 1!');
      return;
    } else if(this.floorSelected2 == undefined){
      alert('Please select floor 2!');
      return;
    } else {
      this.passageService.updatePassage(code, floor1, floor2, building1, building2);
    }
  }
}
