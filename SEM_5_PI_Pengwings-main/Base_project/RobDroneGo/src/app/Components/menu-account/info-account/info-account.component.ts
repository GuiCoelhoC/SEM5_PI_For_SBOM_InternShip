import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/service/AuthService';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.css']
})
export class InfoAccountComponent {
  User: User = {};
  UserFound: boolean = false;
  constructor(private authService: AuthService, private UserService: UserService, private router: Router) { }

  async ngOnInit() {
    console.log('UpdateAccountComponent');
    await this.updateUser();
  }

  async updateUser() { //this is not update the user itself, is to update the user in the view
    var token = this.authService.getToken();
    if (token != null && token != '') {
      try {
        this.User = await this.UserService.getUser(token.toString());
        this.UserFound = true;
        console.log(this.User.firstName);
        console.log(this.User);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('You need to be logged in to see your account information!');
      window.location.href = '';
    }
  }

}
