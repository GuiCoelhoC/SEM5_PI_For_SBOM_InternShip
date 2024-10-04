import { Component } from '@angular/core';
import {SharedService} from "../../service/SharedService";
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-passage',
  templateUrl: './main-passage.component.html',
  styleUrls: ['./main-passage.component.css']
})
export class MainPassageComponent {

  createPassageTab = false;
  listPassageTab = false;
  updatePassageTab = false;

  constructor(private sharedService: SharedService, private _location: Location) { }

  ngOnInit(): void {
    this.sharedService.passageSelected$.subscribe(() => {
      // Add your logic here when the passage is selected
      console.log('Passage selected!');
    });
  }

  showCreatePassageTab() {
    this.createPassageTab = true;
    this.listPassageTab = false;
    this.updatePassageTab = false;
  }

  showListPassageTab() {
    this.listPassageTab = true;
    this.updatePassageTab = false;
    this.createPassageTab = false;
  }

  showUpdatePassageTab() {
    this.updatePassageTab = true;
    this.listPassageTab = false;
    this.createPassageTab = false;
  }

  back() {
    this._location.back();
  }

}
