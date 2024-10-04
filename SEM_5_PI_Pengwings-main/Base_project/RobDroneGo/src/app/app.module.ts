import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuCampusComponent } from './Components/menu-campus/menu-campus.component';
import { CreatePassageComponent } from './Components/passage/create-passage/create-passage.component';
import {FormsModule} from "@angular/forms";
import { CreateElevatorComponent } from './Components/elevator/create-elevator/create-elevator.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { UpdatePassageComponent } from './Components/passage/update-passage/update-passage.component';
import { UpdateElevatorComponent } from './Components/elevator/update-elevator/update-elevator.component';
import { ListElevatorComponent } from './Components/elevator/list-elevator/list-elevator.component';
import { ListRobotsComponent } from './Components/robot/list-robots/list-robots.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { BuildingComponent } from './Components/building/building.component';
import { CreateBuildingComponent } from './Components/building/create-building/create-building.component';
import { FloorComponent } from './Components/floor/floor.component';
import { CreateFloorComponent } from './Components/floor/create-floor/create-floor.component';
import { ListFloorComponent } from './Components/floor/list-floor/list-floor.component';
import { UpdateFloorComponent } from './Components/floor/update-floor/update-floor.component';
import { RobotComponent } from './Components/robot/robot.component';
import { CreateRobotComponent } from './Components/robot/create-robot/create-robot.component';
import { InhibitRobotComponent } from './Components/robot/inhibit-robot/inhibit-robot.component';
import { RobotTypeComponent } from './Components/robot-type/robot-type.component';
import { CreateRobotTypeComponent } from './Components/robot-type/create-robot-type/create-robot-type.component';
import {ElevatorComponent} from "./Components/elevator/elevator.component";
import {ListPassagesComponent} from "./Components/passage/list-passages/list-passages.component";
import {MainPassageComponent} from "./Components/passage/main-passage.component";
import { UpdateBuildingComponent } from './Components/building/update-building/update-building.component';
import { ListBuildingComponent } from './Components/building/list-building/list-building.component';
import { RoomComponent } from './Components/room/room.component';
import { CreateRoomComponent } from './Components/room/create-room/create-room.component';
import {Visualization3DComponent} from "./Components/visualization-3D/visualization3D.component";
import { ListMinMaxBuildingComponent } from './Components/building/list-min-max-building/list-min-max-building.component';
import { MenuFleetComponent } from './Components/menu-fleet/menu-fleet.component';
import { PathFinderComponent } from './Components/building/path-finder/path-finder.component';
import { UpdateMapComponent } from './Components/floor/update-map/update-map.component';
import { MenuLoginComponent } from './Components/menu-login/menu-login.component';
import { MenuRegisterComponent } from './Components/menu-register/menu-register.component';
import { DebugComponent } from './Components/debug/debug.component';
import { MenuAdministratorComponent } from './Components/menu-administrator/menu-administrator.component';
import { UserComponent } from './Components/user/user.component';
import { CreateUserComponent } from './Components/user/create-user/create-user.component';
import { RoleComponent } from './Components/role/role.component';
import { CreateRoleComponent } from './Components/role/create-role/create-role.component';
import { MenuAssignmentComponent } from './Components/menu-assignment/menu-assignment.component';
import { AssignmentComponent } from './Components/assignment/assignment.component';
import { ListAllComponent } from './Components/assignment/list-all/list-all.component';
import { AcceptRejectAssignmentComponent } from './Components/assignment/accept-reject-assignment/accept-reject-assignment.component';
import { CreateAssignmentComponent } from './Components/assignment/create-assignment/create-assignment.component';
import { ListPendingComponent } from './Components/assignment/list-pending/list-pending.component';
import { ConsentFormComponent } from './Components/menu-register/consent-form/consent-form.component';
import { MenuAccountComponent } from './Components/menu-account/menu-account.component';
import { InfoAccountComponent } from './Components/menu-account/info-account/info-account.component';
import { UpdateAccountComponent } from './Components/menu-account/update-account/update-account.component';
import { DeleteAccountComponent } from './Components/menu-account/delete-account/delete-account.component';
import { TaskSequenceComponent } from './Components/assignment/task-sequence/task-sequence.component';
import { ListFloorWithPassageComponent } from './Components/floor/list-floor-with-passage/list-floor-with-passage.component';

const routes: Routes = [
  { path: '',             component: NavbarComponent, children: [
    { path: 'login',     component: MenuLoginComponent },
    { path: 'register',  component: MenuRegisterComponent, children: [
      { path: 'consent-form', component: ConsentFormComponent }]
    }]
  },
  { path: 'debug',        component: DebugComponent},
  { path: 'menu-campus',  component: MenuCampusComponent},
  { path: 'menu-fleet',   component: MenuFleetComponent},
  { path: 'visualization-3D', component: Visualization3DComponent},
  { path: 'menu-administrator', component: MenuAdministratorComponent},
  { path: 'menu-assignment', component: MenuAssignmentComponent},
  { path: 'menu-account', component: MenuAccountComponent, children: [
      { path: 'info', component: InfoAccountComponent },
      { path: 'update', component: UpdateAccountComponent },
      { path: 'delete', component: DeleteAccountComponent }]
  },

  { path: 'user',         component: UserComponent, children: [
    { path: 'create',     component: CreateUserComponent }]},
  { path: 'role',         component: RoleComponent, children: [
    { path: 'create',     component: CreateRoleComponent }]},
  { path: 'building',     component: BuildingComponent, children: [
    { path: 'create',     component: CreateBuildingComponent },
      { path:'listminmax', component: ListMinMaxBuildingComponent}],
  },
  { path: 'elevator',     component: ElevatorComponent, children: [
    { path: 'create',     component: CreateElevatorComponent },
    { path: 'list',       component: ListElevatorComponent },
    { path: 'update',     component: UpdateElevatorComponent }],
  },
  { path: 'floor',        component: FloorComponent, children: [
    { path: 'create',     component: CreateFloorComponent },
    { path: 'list',       component: ListFloorComponent },
    { path: 'update',     component: UpdateFloorComponent }],
  },
  { path: 'robot',        component: RobotComponent, children: [
    { path: 'create',     component: CreateRobotComponent },
    { path: 'list',       component: ListRobotsComponent },
      { path: 'inhibit',    component: InhibitRobotComponent }],
  },
  { path: 'robot-type',   component: RobotTypeComponent, children: [
    { path: 'create',     component: CreateRobotTypeComponent }],
  },
  { path: 'passage',      component: MainPassageComponent, children: [
    { path: 'create',     component: CreatePassageComponent },
    { path: 'list',       component: ListPassagesComponent },
    { path: 'update',     component: UpdatePassageComponent }],
  },
  { path: 'room',         component: RoomComponent},
  { path: 'assignment',   component: AssignmentComponent,children: [
      {path: 'create', component: CreateAssignmentComponent},
      {path: 'listAll', component: ListAllComponent},
      {path: 'listPending', component: ListPendingComponent},
      {path: 'acceptReject', component: AcceptRejectAssignmentComponent},
      {path: 'taskSequence', component: TaskSequenceComponent}
    ] }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuCampusComponent,
    ElevatorComponent,
    CreateElevatorComponent,
    MainPassageComponent,
    CreatePassageComponent,
    UpdatePassageComponent,
    ListPassagesComponent,
    UpdateElevatorComponent,
    ListElevatorComponent,
    ListRobotsComponent,
    Visualization3DComponent,
    NavbarComponent,
    BuildingComponent,
    CreateBuildingComponent,
    FloorComponent,
    CreateFloorComponent,
    ListFloorComponent,
    UpdateFloorComponent,
    RobotComponent,
    CreateRobotComponent,
    InhibitRobotComponent,
    RobotTypeComponent,
    CreateRobotTypeComponent,
    UpdateBuildingComponent,
    ListBuildingComponent,
    RoomComponent,
    CreateRoomComponent,
    ListMinMaxBuildingComponent,
    MenuFleetComponent,
    PathFinderComponent,
    UpdateMapComponent,
    MenuLoginComponent,
    MenuRegisterComponent,
    DebugComponent,
    MenuAdministratorComponent,
    UserComponent,
    CreateUserComponent,
    RoleComponent,
    CreateRoleComponent,
    MenuAssignmentComponent,
    AssignmentComponent,
    ListAllComponent,
    AcceptRejectAssignmentComponent,
    CreateAssignmentComponent,
    ListPendingComponent,
    ConsentFormComponent,
    MenuAccountComponent,
    InfoAccountComponent,
    UpdateAccountComponent,
    DeleteAccountComponent,
    TaskSequenceComponent,
    ListFloorWithPassageComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        CommonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
