import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../config';
import {Assignment} from "../interface/assignment";
import {AuthService} from "./AuthService";

@Injectable({
  providedIn: 'root'
})

export class AssignmentService {
  constructor (private http: HttpClient, private authService : AuthService) {}

  listAll() : Observable<Assignment[]>{
    let token = this.authService.getToken();
    return this.http.get<Assignment[]>(API_URL.dotnet_url + "/Assignment/"+token,
      {observe: 'body', responseType: 'json'});
  }

  createAssignment(type: string, startPoint: string, endPoint: string) {
    let token = this.authService.getToken();
    const body = {
      startPoint: startPoint,
      endPoint: endPoint,
      type: type,
      token: token
    }
    this.http.post(API_URL.dotnet_url + '/Assignment', body).subscribe((response: any) => {
      alert("Assignment creation response received!");
    }, error => {
      alert("Building creation error. Error message: " + error.status + " - " + error.value);
    });
  }

  getPendingAssignments(){
    let token = this.authService.getToken();
    return this.http.get<Assignment[]>(API_URL.dotnet_url + "/Assignment/pendind/"+token,
      {observe: 'body', responseType: 'json'});
  }

  getAcceptedAssignments(){
    let token = this.authService.getToken();
    return this.http.get<Assignment[]>(API_URL.dotnet_url + "/Assignment/accepted/"+token,
      {observe: 'body', responseType: 'json'});
  }

  changestatus(id : string, status: string){
    let token = this.authService.getToken();
    const body = {
    }
    this.http.put(API_URL.dotnet_url + '/Assignment/'+id+'/'+status+'/'+token,body).subscribe((response: any) => {
      alert("Assignment creation response received!");
    }, error => {
      alert("Building creation error. Error message: " + error.status + " - " + error.value);
    });
  }
}
