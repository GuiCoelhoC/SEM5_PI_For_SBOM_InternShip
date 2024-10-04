import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RoomService } from 'src/app/service/RoomService';
import { BuildingService } from 'src/app/service/BuildingService';
import { FloorService } from 'src/app/service/FloorService';
import { Room } from 'src/app/interface/room';
import { Floor } from 'src/app/interface/floor';
import { Building } from 'src/app/interface/building';
import { map } from 'rxjs';

@Component({
  selector: 'app-room-create',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {

  constructor( private roomService: RoomService, private buildingService : BuildingService, private floorService : FloorService){}

  buildings: Building[] = [];

  floors: Floor[] = [];

  buildingSelected : Building | undefined;

  floorSelected : Floor | undefined;

  roomTypeSelected : string | undefined;

  ngOnInit(){
    this.buildingService.listBuildings().subscribe((data: Building[]) => {
      this.buildings = data;
    });
  }

  createRoom(){
    const roomName = (<HTMLInputElement>document.getElementById('roomName')).value;
    const description = (<HTMLInputElement>document.getElementById('roomDescription')).value;

    if (this.buildingSelected == undefined || this.floorSelected == undefined || this.roomTypeSelected == undefined){
      alert('Please select building, floor and room type!');
      return;
    } else {
      this.roomService.createRoom(roomName, this.floorSelected.floorNumber, this.buildingSelected.code, description, this.roomTypeSelected);
    }
    
  }

  onSelectBuilding() {
    if (this.buildingSelected){
      this.floorService.getFloorList(this.buildingSelected.code)
      .pipe(
        map((response: any) => response._value)
      )
      .subscribe((floorlist: Floor[]) => {
        this.floors = floorlist;
      });
    }
  }
}
