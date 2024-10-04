import { Component } from '@angular/core';
import {Assignment} from "../../../interface/assignment";
import {AssignmentService} from "../../../service/AssignmentService";

@Component({
  selector: 'app-list-pending',
  templateUrl: './list-pending.component.html',
  styleUrls: ['./list-pending.component.css']
})
export class ListPendingComponent {

  assignments: Assignment[] = [];

  constructor(private assignmentService: AssignmentService) {
  }

  ngOnInit() {
    this.assignmentService.getPendingAssignments().subscribe((assignments: Assignment[]) => {
      this.assignments = assignments;
    });
  }

}
