import { Component } from '@angular/core';
import {AssignmentService} from "../../../service/AssignmentService";
import {RoomService} from "../../../service/RoomService";
import {Room} from "../../../interface/room";
import { API_URL } from '../../../../../config';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent {

  startPointSelected: Room | undefined;
  endPointSelected: Room | undefined;
  rooms: Room[] = [];

  types: string[] = API_URL.tasks;
  typeSelected: string | undefined;

  constructor(private assignmentService : AssignmentService,private roomService : RoomService) { }

  ngOnInit(): void {
    this.roomService.listRooms().subscribe((data: Room[]) => {
      this.rooms = data;
    });
  }

  createAssignment(){
    if (this.startPointSelected == undefined || this.endPointSelected == undefined){
      alert("Please select a start point and an end point");
      return;
    }else{
      if(this.startPointSelected.name == this.endPointSelected.name){
        alert("Start point and end point must be different");
        return;
      }else{
        if(this.typeSelected != undefined){
          this.assignmentService.createAssignment(this.typeSelected, this.startPointSelected.name, this.endPointSelected.name);
        }
      }
    }
  }

}
