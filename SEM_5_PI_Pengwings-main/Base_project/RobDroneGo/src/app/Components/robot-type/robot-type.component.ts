import { Component } from '@angular/core';
import {SharedService} from "../../service/SharedService";
import { Location } from '@angular/common';

@Component({
  selector: 'app-robot-type',
  templateUrl: './robot-type.component.html',
  styleUrls: ['./robot-type.component.css']
})
export class RobotTypeComponent {

  constructor(private sharedService: SharedService, private _location: Location) {}

  ngOnInit(): void {
    this.sharedService.robotTypeSelected$.subscribe(() => {
      // Add your logic here when floor is selected
      console.log('Robot Type selected!');
    });
  }

  createRobotTypeTab = false;

  showCreateRobotTypeTab() {
    this.createRobotTypeTab = true;
  }

  back() {
    this._location.back();
  }
}
