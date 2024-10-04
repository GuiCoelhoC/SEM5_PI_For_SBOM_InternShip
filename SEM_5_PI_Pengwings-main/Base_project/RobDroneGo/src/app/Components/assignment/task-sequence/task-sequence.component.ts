import { Component } from '@angular/core';
import {AssignmentService} from "../../../service/AssignmentService";
import {Assignment} from "../../../interface/assignment";

@Component({
  selector: 'app-task-sequence',
  templateUrl: './task-sequence.component.html',
  styleUrls: ['./task-sequence.component.css']
})
export class TaskSequenceComponent {

  selectedAlgorithm: string = "";
  assignments: Assignment[] = [];

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit(): void {
  }

  onselectedAlgorithm(){
    if (this.assignments.length == 0){
      this.assignmentService.getAcceptedAssignments().subscribe((data: Assignment[]) => {
        this.assignments = data;
      });
    }
    console.log(this.assignments);
    if (this.selectedAlgorithm == "Genetic"){
      this.assignments.sort((a, b) => 0.5 - Math.random());
    }
    else if (this.selectedAlgorithm == "All permutation"){
      this.assignments.sort((a, b) => (
        a.id && b.id && a.id < b.id ? -1 : 1
      ));
    }
  }

}
