import {Component, OnInit} from '@angular/core';
import {BuildingService} from "../../../service/BuildingService";
import {Building} from "../../../interface/building";

@Component({
  selector: 'app-list-min-max-building',
  templateUrl: './list-min-max-building.component.html',
  styleUrls: ['./list-min-max-building.component.css']
})
export class ListMinMaxBuildingComponent implements OnInit{

  buildingList : Building[] = [];

  showMinMaxBuilding : boolean = false;

  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
  }

  onSelectedMinMaxBuilding() {
    const min = (<HTMLInputElement>document.getElementById("floatingMin")).value;
    const max = (<HTMLInputElement>document.getElementById("floatingMax")).value;
    this.buildingList = [];
    if (Number.parseInt(min)<Number.parseInt(max)){
      this.buildingService.listMinMax(min,max)
        .subscribe((buildings: Building[]) => {
          this.buildingList = buildings;
        });
    }else{
      alert("Min value must be less than Max value");
    }
  }

  showMinMaxBuildingList() {
    this.showMinMaxBuilding = true;
  }


}
