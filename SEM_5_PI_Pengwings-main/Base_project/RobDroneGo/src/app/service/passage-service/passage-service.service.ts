import { Injectable } from '@angular/core';
import IPassageDTO from "../../../../../src/dto/IPassageDTO";
import {response} from "express";
import IRobotDTO from "../../../../../src/dto/IRobotDTO";
import {HttpClient} from "@angular/common/http";
import {Passage} from "../../interface/passage";
import {API_URL} from "config";
import {AuthService} from "../AuthService";
import {Building} from "../../interface/building";

@Injectable({
  providedIn: 'root'
})
export class PassageService {

  passages : IPassageDTO[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  createPassage(code : string, floor1Id : string , floor2Id : string , building1Id : string , building2Id : string) {
    const requestBody = {
      code: code,
      floor1Id: floor1Id,
      floor2Id: floor2Id,
      building1Id: building1Id,
      building2Id: building2Id,
      token: this.authService.getToken()
    };
    alert("Passage creation in progress...");
    console.log(requestBody);
    this.http.post(API_URL.nodejs_url + '/passages', requestBody).subscribe((response: any) => {
      alert("Passage creation response received!");
    }, error => {
        alert("Passage creation error. Error message: " + error.status + " - " + error.value);
    });
  }

  getListOfPassages(building1Id : string | undefined, building2Id : string | undefined){
    return this.http.get<Passage[]> (API_URL.nodejs_url + '/passages?building1Id=' + building1Id + '&building2Id=' + building2Id+ '&token=' + this.authService.getToken(),
      {observe: 'body', responseType: 'json'});
  }


  //  verificar que diferença faz os headers
  updatePassage(code : string, floor1Id : string , floor2Id : string , building1Id : string , building2Id : string){
    const requestBody = {
      code: code,
      floor1Id: floor1Id,
      floor2Id: floor2Id,
      building1Id: building1Id,
      building2Id: building2Id,
      token: this.authService.getToken()
    };
    alert("Passage update in progress...");
    console.log(requestBody);
    this.http.patch(API_URL.nodejs_url + '/passages', requestBody).subscribe((response: any) => {
      alert("Passage update response received!");
    }, error => {
      alert("Passage update error. Error message: " + error.status + " - " + error.value);
    });
  }

  passageList() {
    return this.http.get<Passage[]>(API_URL.nodejs_url + '/passages/all?token=' + this.authService.getToken(),
      {observe: 'body', responseType: 'json'});
  }

  listBuildings() {
    return this.http.get<Building[]>(API_URL.nodejs_url + '/building?token=' + this.authService.getToken(),
      {observe: 'body', responseType: 'json'});
  }

}
