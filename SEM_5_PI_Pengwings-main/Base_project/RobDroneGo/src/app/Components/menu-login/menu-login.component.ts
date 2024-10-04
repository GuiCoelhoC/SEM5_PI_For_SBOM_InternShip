import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/AuthService';
import {SharedService} from 'src/app/service/SharedService';

@Component({
  selector: 'app-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css']
})
export class MenuLoginComponent {
  constructor(private router: Router, private authService: AuthService, private sharedService: SharedService) {}

  private tokenKey = 'token';
  private token: string = '';
  
  LoginUser() {
    const email = (<HTMLInputElement>document.getElementById('floatingEmail')).value;
    const password = (<HTMLInputElement>document.getElementById('floatingPassword')).value;

    this.authService.login(email, password).subscribe(
      (response) => {
        // Store the token in local storage
         this.token = response.token;
         this.redirectToRole().then(role => {
          switch(role) {
            case 'Fleet Manager':
                this.navigateToMenuFleet();
                break;
            case 'Campus Manager':
                this.navigateToMenuCampus();
                break;
            case 'Task Manager':
                this.navigateToMenuAssignments();
                break;
            case 'Administrator':
                this.navigateToMenuAdministrator();
                break;
            default:
                alert('Role not found!');
                break;
        }
          
        });
        // Handle successful login, e.g., redirect to a protected route
      },
      (error) => {
        // Handle login failure
        alert('Login failed: ' + error.error);
      }
    );
  }

  navigateToMenuFleet() {
    this.router.navigate(['menu-fleet']);
  }

  navigateToMenuCampus() {
    this.router.navigate(['menu-campus']);
  }

  navigateToMenuAssignments() {
    this.router.navigate(['menu-assignment']);
  }

  navigateToMenuAdministrator() {
    this.router.navigate(['menu-administrator']);
  }

  async redirectToRole() {
    var role = await this.authService.getRequestRole(this.token);
    if(role == null){
      alert('Role not found!');
      return null;
    }

    return role;
  }
}
