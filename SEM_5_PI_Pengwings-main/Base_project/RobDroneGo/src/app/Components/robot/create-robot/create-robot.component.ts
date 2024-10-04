import { Component } from '@angular/core';
import {RobotService} from "../../../service/robot-service/robot.service";
import {RobotTypeService} from "../../../service/RobotTypeService";
import {RobotType} from "../../../interface/robotType";

@Component({
  selector: 'app-create-robot',
  templateUrl: './create-robot.component.html',
  styleUrls: ['./create-robot.component.css']
})
export class CreateRobotComponent {

  types : RobotType[] = [];

  typeSelected : RobotType | undefined;

  constructor(private robotService: RobotService,private robotTypeService: RobotTypeService) {
  }

  ngOnInit(): void {
    this.robotTypeService.getRobotTypes().subscribe((data: RobotType[]) => {
      this.types = data;
    });
  }

  createRobot(){
    if(this.typeSelected?.type != undefined) {
      const robotCode = (<HTMLInputElement>document.getElementById('floatingRobotCode')).value;
      const robotName = (<HTMLInputElement>document.getElementById('floatingRobotName')).value;
      const robotSerialNumber = (<HTMLInputElement>document.getElementById('floatingRobotSerialNumber')).value;
      const robotDescription = (<HTMLInputElement>document.getElementById('floatingRobotDescription')).value;

      this.robotService.createRobot(robotCode, robotName, robotSerialNumber, robotDescription, this.typeSelected.type);
    }
  }

}
