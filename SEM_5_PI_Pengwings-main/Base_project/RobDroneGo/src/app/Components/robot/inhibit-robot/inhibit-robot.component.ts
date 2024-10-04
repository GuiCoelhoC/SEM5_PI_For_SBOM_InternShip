import { Component } from '@angular/core';
import {RobotService} from "../../../service/robot-service/robot.service";
import {Robot} from "../../../interface/robot";

@Component({
  selector: 'app-inhibit-robot',
  templateUrl: './inhibit-robot.component.html',
  styleUrls: ['./inhibit-robot.component.css']
})
export class InhibitRobotComponent {

  robots : Robot[] = [];

  robotSelected : Robot | undefined;

  constructor(private robotService: RobotService) {
  }

  ngOnInit(): void {
    this.robotService.listActiveRobots().subscribe((robots :Robot[]) => {
      this.robots = robots;
    });
  }

  inhibitRobot(){
    if(this.robotSelected?.code != undefined){
      this.robotService.inhibitRobot(this.robotSelected.code);
    }
  }

}
