import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/SharedService';
import { Location } from '@angular/common';


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit{

  createAssignmentTab = false;
  listAllAssignmentTab = false;
  listPendingAssignmentTab = false;
  AcceptRejectedAssignmentTab = false;
  TaskSequenceTab = false;

  constructor(private sharedService: SharedService,private _location: Location) {}

  ngOnInit(): void {
    this.sharedService.assignmentSelected$.subscribe(() => {
      console.log('Assignment selected!');
    });
  }

  showCreateAssignment() {
    this.createAssignmentTab = true;
    this.listAllAssignmentTab = false;
    this.listPendingAssignmentTab = false;
    this.AcceptRejectedAssignmentTab = false;
    this.TaskSequenceTab = false;
  }
  showListAll() {
    this.createAssignmentTab = false;
    this.listAllAssignmentTab = true;
    this.listPendingAssignmentTab = false;
    this.AcceptRejectedAssignmentTab = false;
    this.TaskSequenceTab = false;
  }

  showListPending() {
    this.createAssignmentTab = false;
    this.listAllAssignmentTab = false;
    this.listPendingAssignmentTab = true;
    this.AcceptRejectedAssignmentTab = false;
    this.TaskSequenceTab = false;
  }

  showAcceptReject() {
    this.createAssignmentTab = false;
    this.listAllAssignmentTab = false;
    this.listPendingAssignmentTab = false;
    this.AcceptRejectedAssignmentTab = true;
    this.TaskSequenceTab = false;
  }

  showTaskSequence() {
    this.createAssignmentTab = false;
    this.listAllAssignmentTab = false;
    this.listPendingAssignmentTab = false;
    this.AcceptRejectedAssignmentTab = false;
    this.TaskSequenceTab = true;
  }

  back(){
    this._location.back();
  }
}
