import { Component } from '@angular/core';
import {PassageService} from "../../../service/passage-service/passage-service.service";
import {Building} from "../../../interface/building";
import {FloorService} from "../../../service/FloorService";
import {Floor} from "../../../interface/floor";
import {map} from "rxjs";
import {response} from "express";

@Component({
  selector: 'app-create-passage',
  templateUrl: './create-passage.component.html',
  styleUrls: ['./create-passage.component.css']
})
export class CreatePassageComponent {

  constructor(private passageService: PassageService, private floorService:FloorService) { }

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
  }

  onSelectedBuilding1(){
    if (this.buildingSelected1){
      this.floorService.getFloorList(this.buildingSelected1.code)
        .pipe(
          map((response: any) =>  response._value)
        )
        .subscribe((data: Floor[]) => {
          this.floors1 = data;
        });
    }
  }

  onSelectedBuilding2(){
    if (this.buildingSelected2){
      this.floorService.getFloorList(this.buildingSelected2.code)
        .pipe(
          map((response: any) =>  response._value)
        )
        .subscribe((data: Floor[]) => {
          this.floors2 = data;
        });
    }
  }


  createPassage(){
    const code = (<HTMLInputElement>document.getElementById('floatingPassageCode')).value;
    const floor1 = (<HTMLInputElement>document.getElementById('floatingPassageFloor1')).value;
    const floor2 = (<HTMLInputElement>document.getElementById('floatingPassageFloor2')).value;
    const building1 = (<HTMLInputElement>document.getElementById('floatingPassageBuilding1')).value;
    const building2 = (<HTMLInputElement>document.getElementById('floatingPassageBuilding2')).value;

    if (this.buildingSelected1 == undefined){
      alert('Please select building 1!');
      return;
    }
    if (this.buildingSelected2 == undefined){
      alert('Please select building 2!');
      return;
    }
    if (this.floorSelected1 == undefined){
      alert('Please select floor 1!');
      return;
    }
    if (this.floorSelected2 == undefined){
      alert('Please select floor 2!');
      return;
    }

    console.log(code);
    console.log(floor1);
    console.log(floor2);
    console.log(building1);
    console.log(building2);


    this.passageService.createPassage(code, floor1, floor2, building1, building2);
  }
}
