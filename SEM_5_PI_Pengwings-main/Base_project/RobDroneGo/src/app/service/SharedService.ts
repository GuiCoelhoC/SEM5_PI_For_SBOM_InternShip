
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    // Observable string source
    private buildingSelectedSource = new Subject<void>();

    // Observable string source
    private floorSelectedSource = new Subject<void>();

    private elevatorSelectedSource = new Subject<void>();

    private robotSelectedSource = new Subject<void>();

    private robotTypeSelectedSource = new Subject<void>();

    private menuCampusSelectedSource = new Subject<void>();

    private menuFleetSelectedSource = new Subject<void>();

    private menuAdministratorSelectedSource = new Subject<void>();

    private menuAssignmentSelectedSource = new Subject<void>();

    private passageSelectedSource = new Subject<void>();

    private roomSelectedSource = new Subject<void>();

    private userSelectedSource = new Subject<void>();

    private visualization3DSelectedSource = new Subject<void>();

    private roleSelectedSource = new Subject<void>();

    private assignmentSelectedSource = new Subject<void>()

    buildingSelected$ = this.buildingSelectedSource.asObservable();

    floorSelected$ = this.floorSelectedSource.asObservable();

    elevatorSelected$ = this.elevatorSelectedSource.asObservable();

    robotSelected$ = this.robotSelectedSource.asObservable();

    robotTypeSelected$ = this.robotTypeSelectedSource.asObservable();

    passageSelected$ = this.passageSelectedSource.asObservable();

    userSelected$ = this.userSelectedSource.asObservable();

    menuCampusSelected$ = this.menuCampusSelectedSource.asObservable();

    menuAssignmentSelected$ = this.menuAssignmentSelectedSource.asObservable();

    menuFleetSelected$ = this.menuFleetSelectedSource.asObservable();

    menuAdministratorSelected$ = this.menuAdministratorSelectedSource.asObservable();

    roomSelected$ = this.roomSelectedSource.asObservable();

    roleSelected$ = this.roleSelectedSource.asObservable();

    assignmentSelected$ = this.assignmentSelectedSource.asObservable();

    // Service command
  visualization3DSelected$ = this.visualization3DSelectedSource.asObservable();
  // Service command
    showBuildings() {
        this.buildingSelectedSource.next();
    }

    showFloors() {
        this.floorSelectedSource.next();
    }

    showRobots() {
        this.robotSelectedSource.next();
    }

    showRobotTypes() {
        this.robotTypeSelectedSource.next();
    }

  showElevators() {
    this.elevatorSelectedSource.next();
  }
    // Service command
    selectFloor() {
        this.floorSelectedSource.next();
    }

    showPassages() {
        this.passageSelectedSource.next();
    }

    showAssignment() {
      this.assignmentSelectedSource.next();
    }

    selectMenuCampus() {
        this.menuCampusSelectedSource.next();
    }

    selectMenuFleet() {
        this.menuFleetSelectedSource.next();
    }

    showRooms() {
        this.roomSelectedSource.next();
    }

    selectMenuAdministrator() {
        this.menuAdministratorSelectedSource.next();
    }

    showUser() {
        this.userSelectedSource.next();
    }

    showRole() {
      this.roleSelectedSource.next();
    }

    selectVisualization3D() {
      this.visualization3DSelectedSource.next();
    }

    selectMenuAssignment(){
      this.menuAssignmentSelectedSource.next();
    }
}
