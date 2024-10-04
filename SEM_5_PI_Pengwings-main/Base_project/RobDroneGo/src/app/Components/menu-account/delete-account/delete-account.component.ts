import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/AuthService';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  message = '';
  error = false;
  constructor(private authService: AuthService, private UserService: UserService) { }

  ngOnInit() {
    var token = this.authService.getToken();
    if (!(token != null && token != '')) {
      alert('You need to be logged in to see your account information!');
      window.location.href = '';
    }
  }

  async DeleteUser() {
    this.message = '';
    var token = this.authService.getToken();
    if (token != null && token != '') {
      const password = (<HTMLInputElement>document.getElementById('Password')).value;
      const message = await this.UserService.deleteUser(token.toString(), password).then(
        response => {
          console.log(response);
          this.error = false;
          return 'User deleted successfully!';
        },
        error => {
          this.error = true;
          return error.error;
        }
      );
      this.message = message;
      if (!this.error) {
        alert('Your account has been deleted!');
        window.location.href = '';
      }
    }
  }
}
