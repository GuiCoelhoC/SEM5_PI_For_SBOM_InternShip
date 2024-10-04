import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from 'config';
import { User } from "../interface/user";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  createUser(user: User) {
    this.http.post(API_URL.dotnet_url + '/Users', user)
      .subscribe((response: any) => {
        //console.log(response); // This will print the entire response object to the console
        alert('User request sent successfully!');
        
      }, error => {
        alert('User request Error:' + JSON.stringify(error.error));
        
      });
  }

  updateUser(token: string, user: User) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.patch(API_URL.dotnet_url + '/Users/token/'+ token, user).subscribe(
        response => {
          resolve(response as User);
        },
        error => {
          if (error.status === 400) {
            console.error('BadRequest: ', error.error)
          }
          reject(error);
        },
      );
    });
  }

  deleteUser(token: string, password: string): Promise<any> {
    const params = new HttpParams().set('password', password);
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL.dotnet_url + '/Users/token/' + token, { params }).subscribe(
        response => {
          resolve(response as User);
        },
        error => {
          if (error.status === 400) {
            console.error('BadRequest: ', error.error)
          }
          reject(error);
        },
      );
    });
  }

  getUser(token: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL.dotnet_url + '/Users/token/' + token).subscribe(
        response => {
          resolve(response as User);
        },
        error => {
          if (error.status === 400) {
            console.error('BadRequest: ', error.error)
          }
          reject(error);
        },
      );
    });
  }
  
}
