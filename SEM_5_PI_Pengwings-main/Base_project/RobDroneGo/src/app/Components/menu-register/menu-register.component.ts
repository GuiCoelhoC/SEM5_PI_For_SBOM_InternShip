import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';
import { SignUpService } from 'src/app/service/SignupService';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/service/SharedService';

@Component({
  selector: 'app-register',
  templateUrl: './menu-register.component.html',
  styleUrls: ['./menu-register.component.css']
})
export class MenuRegisterComponent {
  signupSuccessful = false;
  constructor(private sharedService: SharedService, private router: Router, private http: HttpClient, private signUpService: SignUpService) { }

  consentFormTab = false;
  user: User = {};

  consented: string = '';

  SignupUser() {
    const firstName = (<HTMLInputElement>document.getElementById('floatingFirstName')).value;
    const lastName = (<HTMLInputElement>document.getElementById('floatingLastName')).value;
    const email = (<HTMLInputElement>document.getElementById('floatingEmail')).value;
    const phone = (<HTMLInputElement>document.getElementById('floatingPhone')).value;
    const role = (<HTMLInputElement>document.getElementById('floatingRole')).value;
    const password = (<HTMLInputElement>document.getElementById('floatingPassword')).value;

    if (firstName === '' || lastName === '' || email === '' || phone === '' || role === '' || password === '') {
      alert('Please fill all the fields!');
      return;
    }

    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.email = email;
    this.user.phoneNumber = phone;
    this.user.role = role;
    this.user.password = password;

    //Open a consent form to the user
    //If the user accepts the terms and conditions, then proceed
    //Else, return
    this.showConsentForm();

  }

  showConsentForm() {
    //open a new page to 'consent-form'
    this.consentFormTab = true;
  }

  onConsentChange(consent: boolean) {
    if (!consent) {
      alert('If you want to register you have to accept the terms and conditions.');
      return;
    } else {
       this.signUpService.createUser(this.user as User);
       this.consentFormTab = false;
      alert('User request sent successfully!');
      this.signupSuccessful = true;
    }
  }
}
