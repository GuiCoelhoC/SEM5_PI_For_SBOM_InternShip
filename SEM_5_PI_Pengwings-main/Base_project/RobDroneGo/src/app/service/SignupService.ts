import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { API_URL } from 'config';

@Injectable({
  providedIn: 'root'
})

export class SignUpService {
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    this.http.post(API_URL.dotnet_url + '/Users', user)
      .subscribe((response: any) => {
        //console.log(response); // This will print the entire response object to the console
        alert('User request sent successfully!');
        
      }, error => {
        alert('User request Error:' + JSON.stringify(error.error));
        
      });
  }
}