import { Component } from '@angular/core';
import {SharedService} from "../../service/SharedService";
import { Location } from '@angular/common';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent {

  constructor(private sharedService: SharedService, private _location: Location) {}

  ngOnInit(): void {
    this.sharedService.robotSelected$.subscribe(() => {
      // Add your logic here when floor is selected
      console.log('Robot selected!');
    });
  }

  createRobotTab = false;
  listRobotTab = false;
  inhibitRobotTab = false;

  showCreateRobotTab() {
    this.createRobotTab = true;
    this.listRobotTab = false;
    this.inhibitRobotTab = false;
  }

  showListRobotTab() {
    this.createRobotTab = false;
    this.listRobotTab = true;
    this.inhibitRobotTab = false;
  }

  showInhibitRobotTab() {
    this.createRobotTab = false;
    this.listRobotTab = false;
    this.inhibitRobotTab = true;
  }
  back() {
    this._location.back();
  }

}
