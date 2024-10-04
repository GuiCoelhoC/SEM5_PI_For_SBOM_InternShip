import { Component } from '@angular/core';
import {RobotTypeService} from "../../../service/RobotTypeService";
import { API_URL } from "../../../../../config";

@Component({
  selector: 'app-create-robot-type',
  templateUrl: './create-robot-type.component.html',
  styleUrls: ['./create-robot-type.component.css']
})
export class CreateRobotTypeComponent {

  tasks = API_URL.tasks;

  selectedTasks: string[] = [];

  constructor(private robotTypeService: RobotTypeService) {
  }

  ngOnInit(): void {
  }

  createRobotType(){
    const robotTypeType = (<HTMLInputElement>document.getElementById('floatingRobotTypeType')).value;
    const robotTypeBrand = (<HTMLInputElement>document.getElementById('floatingRobotTypeBrand')).value;
    const robotTypeModel = (<HTMLInputElement>document.getElementById('floatingRobotTypeModel')).value;

    this.robotTypeService.createRobotType(robotTypeType, robotTypeBrand, robotTypeModel, this.selectedTasks);
  }

  updateSelectedTask(index: number) {
    const task = this.tasks[index];
    if (!this.selectedTasks.includes(task)) {
      console.log("Adding floor: " + task);
      this.selectedTasks.push(task);
    } else {
      console.log("Removing floor: " + task);
      this.selectedTasks = this.selectedTasks?.filter(t => t !== task);
    }
  }

}
