import { Component } from '@angular/core';
import {Assignment} from "../../../interface/assignment";
import {AssignmentService} from "../../../service/AssignmentService";

@Component({
  selector: 'app-accept-reject-assignment',
  templateUrl: './accept-reject-assignment.component.html',
  styleUrls: ['./accept-reject-assignment.component.css']
})
export class AcceptRejectAssignmentComponent {

  assignments: Assignment[] = [];

  constructor(private assignmentService: AssignmentService) {
  }

  ngOnInit() {
    this.assignmentService.getPendingAssignments().subscribe((assignments: Assignment[]) => {
      this.assignments = assignments;
    });
  }

  accept(assignment: Assignment) {
    if(!!assignment){
      this.changeStatus(assignment, "a");
    }
  }

  reject(assignment: Assignment) {
    if(!!assignment){
      this.changeStatus(assignment, "r");
    }
  }

  private changeStatus(assignment : Assignment, status : string){
    if (!!assignment.id){
      this.assignmentService.changestatus(assignment.id,status)
      this.assignments = this.assignments.filter(obj => {return obj !== assignment});
    }
  }


}
