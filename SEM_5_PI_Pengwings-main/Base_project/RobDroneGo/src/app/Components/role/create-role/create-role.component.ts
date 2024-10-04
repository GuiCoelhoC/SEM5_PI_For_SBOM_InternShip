import { Component } from '@angular/core';
import {UserService} from "../../../service/UserService";
import {RoleService} from "../../../service/RoleService";

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
  }

  createRole(){
    const name = (<HTMLInputElement>document.getElementById('floatingRoleName')).value;

    this.roleService.createRole(name);
  }

}
