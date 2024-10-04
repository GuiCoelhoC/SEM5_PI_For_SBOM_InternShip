import { Component } from '@angular/core';
import {SharedService} from "../../service/SharedService";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.userSelected$.subscribe(() => {
      // Add your logic here when floor is selected
      console.log('User selected!');
    });
  }

  createUserTab = false;

  showCreateUserTab() {
    this.createUserTab = true;
  }

}
