import {Component, OnInit} from '@angular/core';
import {RobotService} from "../../../service/robot-service/robot.service";
import {Robot} from "../../../interface/robot";
import {Building} from "../../../interface/building";

@Component({
  selector: 'app-list-robots',
  templateUrl: './list-robots.component.html',
  styleUrls: ['./list-robots.component.css']
})

export class ListRobotsComponent implements OnInit{

  robots : Robot[] | undefined;

  constructor(private robotService : RobotService) { }

  ngOnInit(): void {
    this.robotService.listRobots().subscribe((robots: Robot[]) => {
      this.robots = robots;
    })
  }




}
