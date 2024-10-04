import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/service/AuthService';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent {
  User: User = {};
  message = '';
  constructor( private authService: AuthService, private UserService: UserService, ) { }

  async ngOnInit() {
    console.log('UpdateAccountComponent');
    await this.updateUser();
  }

  async updateUser() {
    var token = this.authService.getToken();
    if (token != null && token != '') {
      try {
        this.User = await this.UserService.getUser(token.toString());
        console.log(this.User);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('You need to be logged in to see your account information!');
      window.location.href = '';
    }
  }

  async UpdateUser(){
    const firstName = (<HTMLInputElement>document.getElementById('FirstName')).value;
    const lastName = (<HTMLInputElement>document.getElementById('LastName')).value;
    const email = (<HTMLInputElement>document.getElementById('Email')).value;
    const phone = (<HTMLInputElement>document.getElementById('PhoneNumber')).value;
    const role = (<HTMLInputElement>document.getElementById('Role')).value;
    const password = (<HTMLInputElement>document.getElementById('Password')).value;
    if ((password != '') && (password != (<HTMLInputElement>document.getElementById('ConfirmPassword')).value)) {
      this.message = 'Passwords do not match!';
      console.log(this.message);
      return;
    }
    
    this.message = '';
    
    const newUser: User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phone,
      role: role,
      password: password,
    };

    var token = this.authService.getToken();
    
    this.message = await this.UserService.updateUser(token, newUser).then(
      (response) => {
        console.log(response);
        return 'User updated successfully!';
      },
      (error) => {
        console.log(error);
        return 'User update failed!';
      }
    );
  }
  
}