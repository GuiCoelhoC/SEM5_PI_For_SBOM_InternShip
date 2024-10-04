import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Building} from "../../interface/building";
import {Robot} from "../../interface/robot";
import {Observable} from "rxjs";
import {API_URL} from "config";
import {AuthService} from "../AuthService";

@Injectable({
  providedIn: 'root'
})

export class RobotService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  createRobot(code: string, name: string, serial_number: string, description: string, type: string) {
    const body = {
      code: code,
      name: name,
      serial_number: serial_number,
      description: description,
      type: type,
      token: this.authService.getToken()
    };
    this.http.post (API_URL.nodejs_url + '/robot', body).subscribe((response: any) => {
      alert('Robot created successfully');
    }, error => {
      alert('Error creating robot: ' + error.status + ' - ' + error.value);
    });

  }

  inhibitRobot(code: string) {
    const body = {
      code: code,
      token: this.authService.getToken()
    };
    this.http.patch(API_URL.nodejs_url + '/robot', body).subscribe((response: any) => {
      alert('Robot inhibited successfully');
    }, error => {
      alert('Error inhibiting robot: ' + error.status + ' - ' + error.value);
    });
  }
    listRobots() : Observable<Robot[]>{
      return this.http.get<Robot[]>(API_URL.nodejs_url + '/robot?token=' + this.authService.getToken(),
          {observe: 'body', responseType: 'json'});
    }

    listActiveRobots() : Observable<Robot[]>{
      return this.http.get<Robot[]>(API_URL.nodejs_url + '/robot/active?token=' + this.authService.getToken(),
          {observe: 'body', responseType: 'json'});
    }
}
