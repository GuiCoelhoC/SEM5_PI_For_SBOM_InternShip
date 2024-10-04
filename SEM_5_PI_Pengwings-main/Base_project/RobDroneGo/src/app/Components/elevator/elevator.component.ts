import { Component } from '@angular/core';
import {SharedService} from "../../service/SharedService";
import { Location } from '@angular/common';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css']
})
export class ElevatorComponent {
  constructor(private sharedService: SharedService, private _location: Location) {}

  ngOnInit(): void {
    this.sharedService.elevatorSelected$.subscribe(() => {
      // Add your logic here when floor is selected
      console.log('Elevator selected!');
    });
  }

  createElevatorTab = false;
  listElevatorTab = false;
  updateElevatorTab = false;

  showCreateElevatorTab() {
    this.createElevatorTab = true;
    this.listElevatorTab = false;
    this.updateElevatorTab = false;
  }

  showListElevatorTab() {
    this.createElevatorTab = false;
    this.listElevatorTab = true;
    this.updateElevatorTab = false;
  }

  showUpdateElevatorTab() {
    this.createElevatorTab = false;
    this.listElevatorTab = false;
    this.updateElevatorTab = true;
  }

  back() {
    this._location.back();
  }

}
