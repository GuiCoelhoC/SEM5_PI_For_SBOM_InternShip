import { Component } from '@angular/core';
import {SharedService} from "../../service/SharedService";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.roleSelected$.subscribe(() => {
      // Add your logic here when floor is selected
      console.log('Role selected!');
    });
  }

  createRoleTab = false;

  showCreateRoleTab() {
    this.createRoleTab = true;
  }

}
