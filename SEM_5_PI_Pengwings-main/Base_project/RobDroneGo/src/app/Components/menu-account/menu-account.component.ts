import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-menu-account',
  templateUrl: './menu-account.component.html',
  styleUrls: ['./menu-account.component.css']
})
export class MenuAccountComponent {

  constructor(private _location: Location) { }

  updateAccountTab = false;
  accountInformationTab = false;
  deleteAccountTab = false;
  createAssignmentTab = false;

  showUpdateAccountTab() {
    this.updateAccountTab = true;
    this.accountInformationTab = false;
    this.deleteAccountTab = false;
    this.createAssignmentTab = false;
  }

  showAccountInformationTab() {
    this.updateAccountTab = false;
    this.accountInformationTab = true;
    this.deleteAccountTab = false;
    this.createAssignmentTab = false;
  }

  showDeleteAccountTab() {
    this.updateAccountTab = false;
    this.accountInformationTab = false;
    this.deleteAccountTab = true;
    this.createAssignmentTab = false;
  }

  showCreateAssignmentTab() {
    this.updateAccountTab = false;
    this.accountInformationTab = false;
    this.deleteAccountTab = false;
    this.createAssignmentTab = true;
  }

  back(){
    this._location.back();
  }
}
