import { Component } from '@angular/core';
import {SharedService} from "../../service/SharedService";
import { Location } from '@angular/common';
@Component({
  selector: 'app-menu-fleet',
  templateUrl: './menu-fleet.component.html',
  styleUrls: ['./menu-fleet.component.css']
})
export class MenuFleetComponent {

  constructor(private sharedService: SharedService, private _location: Location) { }

  ngOnInit(): void{
    this.sharedService.menuCampusSelected$.subscribe(() => {
      console.log('Fleet menu has been selected');
    });
  }

  showRobot(): void {
    this.sharedService.showRobots();
  }

  showRobotType(): void {
    this.sharedService.showRobotTypes();
  }

  back(){
    this._location.back();
  }
}
