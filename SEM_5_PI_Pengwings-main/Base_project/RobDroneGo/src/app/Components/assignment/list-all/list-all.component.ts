import { Component } from '@angular/core';
import {Assignment} from "../../../interface/assignment";
import {AssignmentService} from "../../../service/AssignmentService";

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent {

  assignments: Assignment[] = [];

  selectedOrder: string = "";

  constructor(private assignmentService : AssignmentService) { }

  ngOnInit() {
    this.assignmentService.listAll().subscribe((assignments: Assignment[]) => {
      this.assignments = assignments;
    });
  }

  onSelectedOrder() {
    try {
      if (this.assignments) {
        switch (this.selectedOrder) {
          case "Start Point":
            this.assignments.sort((a, b) => (
              a.startPoint && b.startPoint && a.startPoint < b.startPoint ? -1 : 1
            ));
            break;
          case "End Point":
            this.assignments.sort((a, b) => (
              a.endPoint && b.endPoint && a.endPoint < b.endPoint ? -1 : 1
            ));
            break;
          case "Status":
            this.assignments.sort((a, b) => (
              a.status && b.status && a.status < b.status ? -1 : 1
            ));
            break;
          case "Type":
            this.assignments.sort((a,b) => (
              a.type && b.type && a.type < b.type ? -1 : 1
            ));
            break;
          case "User":
            this.assignments.sort((a,b) => (
              a.email && b.email && a.email < b.email ? -1 : 1
            ));
            break;
          case "Name":
            this.assignments.sort((a,b) => (
              a.name && b.name && a.name < b.name ? -1 : 1
            ));
            break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

}
