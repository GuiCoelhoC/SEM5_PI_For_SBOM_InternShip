import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangeDetectorRef } from "@angular/core";
import { Observable } from 'rxjs';
import { Building } from '../interface/building';
import { PathFound } from '../interface/pathfound';
import IBuildingDTO from '../../../../src/dto/IBuildingDTO';
import { API_URL } from '../../../config';
import {AuthService} from "./AuthService";

@Injectable({
    providedIn: 'root'
})

export class BuildingService {
    constructor (private http: HttpClient,private authService: AuthService) {}

    createBuilding(code: string, name: string, description: string, widthMax: string, lengthMax: string) {
        const requestBody = {
            code: code,
            name: name,
            description: description,
            widthMax: widthMax,
            lengthMax: lengthMax,
            token: this.authService.getToken()
        };
        alert("Building creation in progress...");
        console.log(requestBody);
        this.http.post(API_URL.nodejs_url + '/building', requestBody).subscribe((response: any) => {
            alert("Building creation response received!");
        }, error => {
            alert("Building creation error. Error message: " + error.status + " - " + error.value);
        });
    }

    updateBuilding(code: string | undefined, name: string, description: string, widthMax: string, lengthMax: string) {
        const requestBody = {
            code: code,
            name: name,
            description: description,
            widthMax: widthMax,
            lengthMax: lengthMax,
            token: this.authService.getToken()
        };
        alert("Building update in progress...");
        console.log(requestBody);
        this.http.patch(API_URL.nodejs_url + '/building', requestBody).subscribe((response: any) => {
            alert("Building update response received!");
        }, error => {
            alert("Building update error. Error message: " + error.status + " - " + error.value);
        }
        );
    }

    listBuildings() : Observable<Building[]>{
        return this.http.get<Building[]>(API_URL.nodejs_url + '/building?token=' + this.authService.getToken(),
        {observe: 'body', responseType: 'json'});
    }

    listMinMax(min: string, max: string) : Observable<Building[]>{
      return this.http.get<Building[]>(API_URL.nodejs_url + '/building/minmax?min=' + min + '&max=' + max+'&token=' + this.authService.getToken(),
      {observe: 'body', responseType: 'json'});
    }

    findPaths(room1: string, room2: string) : Observable<PathFound>{
        return this.http.get<PathFound>(API_URL + '/path_between_floors?room1=' + room1 + '&room2=' + room2,
        {observe: 'body', responseType: 'json'});
    }

    testProlog(room1: string, room2: string) : Observable<any>{
        const requestBody = {
            room1: room1,
            room2: room2
        };
        return this.http.post<any>(API_URL + '/test_prolog', requestBody,
        {observe: 'body', responseType: 'json'});
    }
}
