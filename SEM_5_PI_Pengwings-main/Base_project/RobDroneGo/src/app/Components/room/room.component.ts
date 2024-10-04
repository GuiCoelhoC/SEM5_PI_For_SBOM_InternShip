import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  constructor(private _location: Location) {}

  createRoomTab = false;

  showCreateRoomTab(){
    this.createRoomTab = true;
  }

  back() {
    this._location.back();
  }
}
