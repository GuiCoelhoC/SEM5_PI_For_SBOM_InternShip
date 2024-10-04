import { Component } from '@angular/core';
import { UserService } from "../../../service/UserService";
import { Role } from "../../../interface/role";
import { RoleService } from "../../../service/RoleService";
import { User } from "../../../interface/user";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  roleList: Role[] = [];
  
  user: User = {};


  constructor(private userService: UserService, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getRoleList();
  }

  createUser() {
      const firstName = (<HTMLInputElement>document.getElementById("floatingFirstName")).value;
      const lastName = (<HTMLInputElement>document.getElementById("floatingLastName")).value;
      const email = (<HTMLInputElement>document.getElementById("floatingEmail")).value;
      const phone = (<HTMLInputElement>document.getElementById("floatingPhone")).value;
      const password = (<HTMLInputElement>document.getElementById("floatingPassword")).value;
      const role = (<HTMLInputElement>document.getElementById('floatingRole')).value;

      if (firstName == "" || lastName == "" || email == "" || phone == "" || password == "" || role == "") {
        console.log(firstName, lastName, email, phone, password, role)
        alert('Please fill in all fields!');
        return;
      }

      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.user.email = email;
      this.user.phoneNumber = phone;
      this.user.role = role;
      this.user.password = password;

      this.userService.createUser(this.user as User);

      alert('User request sent successfully!');
  }

  getRoleList() {
    this.roleService.listRoles().subscribe((roles: Role[]) => {
      this.roleList = roles;
    });
  }

}
