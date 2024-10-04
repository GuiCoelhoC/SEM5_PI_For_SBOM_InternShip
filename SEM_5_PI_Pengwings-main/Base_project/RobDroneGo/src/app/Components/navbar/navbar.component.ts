import { Component } from '@angular/core';
import { SharedService } from 'src/app/service/SharedService';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private sharedService: SharedService) {}

  loginMenuTab = false;
  registerMenuTab = false;

  selectLogin(){
    this.loginMenuTab = true;
    this.registerMenuTab = false;
  }

  selectRegister(){
    this.loginMenuTab = false;
    this.registerMenuTab = true;
  }
}
