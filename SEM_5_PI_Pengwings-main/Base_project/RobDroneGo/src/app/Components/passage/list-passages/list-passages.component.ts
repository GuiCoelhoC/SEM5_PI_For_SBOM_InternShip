import {Component, OnInit} from '@angular/core';
import {PassageService} from "../../../service/passage-service/passage-service.service";
import {Building} from "../../../interface/building";
import {Passage} from "../../../interface/passage";
import {map} from "rxjs";
import {BuildingService} from "../../../service/BuildingService";

@Component({
  selector: 'app-list-passages',
  templateUrl: './list-passages.component.html',
  styleUrls: ['./list-passages.component.css']
})
export class ListPassagesComponent implements OnInit{

passageList : Passage[] = [];
buildingList: Building[] = [];

selectedBuilding: Building | undefined;
selectedBuilding2: Building | undefined;
  constructor(private passageService: PassageService,private buildingService: BuildingService) { }

  ngOnInit(): void {
      this.getBuildingList();
  }


  getBuildingList(){
    this.buildingService.listBuildings().subscribe((buildings: Building[]) => {
      this.buildingList = buildings;
    });
  }
  onSelectedBuildings() {
    alert("building selected")
    if (this.selectedBuilding && this.selectedBuilding2) {
      alert("Passages listing");
      this.passageService.getListOfPassages(this.selectedBuilding.code, this.selectedBuilding2.code)
        .pipe(
          map((response: any) => response._value)
        )
        .subscribe((passages: Passage[]) => {
          this.passageList = passages;
        });
      console.log("Passages: " + this.passageList);

    }
  }
}


