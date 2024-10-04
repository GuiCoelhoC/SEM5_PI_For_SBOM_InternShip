import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/SharedService';
import { Location } from '@angular/common';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit{

  createBuildingTab = false;
  listBuildingTab = false;
  updateBuildingTab = false;
  listMinMaxTab = false;
  findPathTab = false;

  constructor(private sharedService: SharedService, private _location: Location) {}

  ngOnInit(): void {
    this.sharedService.buildingSelected$.subscribe(() => {
      // Add your logic here when the building is selected
      console.log('Building selected!');
    });
  }

  showCreateBuildingTab() {
    this.createBuildingTab = true;
    this.listBuildingTab = false;
    this.updateBuildingTab = false;
    this.listMinMaxTab = false;
    this.findPathTab = false;
  }

  showListBuildingTab() {
    this.createBuildingTab = false;
    this.listBuildingTab = true;
    this.updateBuildingTab = false;
    this.listMinMaxTab = false;
    this.findPathTab = false;
  }

  showUpdateBuildingTab() {
    this.createBuildingTab = false;
    this.listBuildingTab = false;
    this.updateBuildingTab = true;
    this.listMinMaxTab = false;
    this.findPathTab = false;
  }

  showListMinMaxTab() {
    this.createBuildingTab = false;
    this.listBuildingTab = false;
    this.updateBuildingTab = false;
    this.listMinMaxTab = true;
    this.findPathTab = false;
  }

  showFindPathTab() {
    this.createBuildingTab = false;
    this.listBuildingTab = false;
    this.updateBuildingTab = false;
    this.listMinMaxTab = false;
    this.findPathTab = true;
  }

  back() {
    this._location.back();
  }
}
