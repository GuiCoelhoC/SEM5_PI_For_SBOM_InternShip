import { Component } from '@angular/core';
import {SharedService} from "../../service/SharedService";
import { Location } from '@angular/common';
@Component({
  selector: 'app-menu-administrator',
  templateUrl: './menu-administrator.component.html',
  styleUrls: ['./menu-administrator.component.css']
})
export class MenuAdministratorComponent {

  constructor(private sharedService: SharedService, private _location: Location) { }

  ngOnInit(): void{
    this.sharedService.menuAdministratorSelected$.subscribe(() => {
      console.log('Admin menu has been selected');
    });
  }

  showUser(): void {
    this.sharedService.showUser();
  }

  back(){
    this._location.back();
  }
}
