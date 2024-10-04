import { Component } from '@angular/core';
import {SharedService} from "../../service/SharedService";
import { Location } from '@angular/common';
@Component({
  selector: 'app-menu-assignment',
  templateUrl: './menu-assignment.component.html',
  styleUrls: ['./menu-assignment.component.css']
})
export class MenuAssignmentComponent {

  constructor(private sharedService: SharedService, private _location: Location) { }

  ngOnInit(): void{
    this.sharedService.menuAssignmentSelected$.subscribe(() => {
      console.log('Assignment menu has been selected');
    });
  }

  showAssignment(): void {
    this.sharedService.showAssignment();
  }

  back(){
    this._location.back();
  }
}
