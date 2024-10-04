import { Component } from '@angular/core';
import { SharedService } from 'src/app/service/SharedService';
@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent {

  constructor(private sharedService: SharedService) {}

  selectMenuCampus(): void {
    this.sharedService.selectMenuCampus();
  }

  selectMenuFleet(): void {
    this.sharedService.selectMenuFleet();
  }

  select3DVisualization() {
    this.sharedService.selectVisualization3D();
  }
  selectMenuAdministrator(): void {
    this.sharedService.selectMenuAdministrator();
  }
  selectMenuAssignment() {
    this.sharedService.selectMenuAssignment();
  }
}
