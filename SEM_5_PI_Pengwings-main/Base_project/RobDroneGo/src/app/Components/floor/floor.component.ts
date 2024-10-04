import { Component } from '@angular/core';
import {SharedService} from "../../service/SharedService";
import { Location } from '@angular/common';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent {

  constructor(private sharedService: SharedService, private _location: Location) {}

  ngOnInit(): void {
    this.sharedService.floorSelected$.subscribe(() => {
      // Add your logic here when floor is selected
      console.log('Floor selected!');
    });
  }

  createFloorTab = false;
  listFloorTab = false;
  updateFloorTab = false;
  updateMapTab = false;
  listFloorPassageTab = false;


  showCreateFloorTab() {
    this.createFloorTab = true;
    this.listFloorTab = false;
    this.updateFloorTab = false;
    this.updateMapTab = false;
    this.listFloorPassageTab = false;
  }

  showListFloorTab() {
    this.createFloorTab = false;
    this.listFloorTab = true;
    this.updateFloorTab = false;
    this.updateMapTab = false;
    this.listFloorPassageTab = false;
  }

  showListFloorPassageTab() {
    this.createFloorTab = false;
    this.listFloorTab = false;
    this.updateFloorTab = false;
    this.updateMapTab = false;
    this.listFloorPassageTab = true;
  }

  showUpdateFloorTab() {
    this.createFloorTab = false;
    this.listFloorTab = false;
    this.updateFloorTab = true;
    this.updateMapTab = false;
    this.listFloorPassageTab = false;
  }

  showUpdateMapTab() {
    this.createFloorTab = false;
    this.listFloorTab = false;
    this.updateFloorTab = false;
    this.updateMapTab = true;
    this.listFloorPassageTab = false;
  }

  back() {
    this._location.back();
  }

}
