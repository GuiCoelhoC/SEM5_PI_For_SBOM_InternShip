import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'config';
import {AuthService} from "./AuthService";
import {Observable} from "rxjs";
import {Room} from "../interface/room";

@Injectable({
    providedIn: 'root'
})

export class RoomService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    createRoom(name: string, floor: number | undefined, building: string | undefined, description: string, roomtype: string){
        const requestBody = {
            floor: floor,
            building: building,
            name: name,
            description: description,
            roomtype: roomtype,
            token: this.authService.getToken()
        }
        alert("Room creation in progress...");
        console.log(requestBody);
        const req = this.http.post(API_URL.nodejs_url + '/rooms', requestBody).subscribe((response: any) => {
            console.log(response);
            alert("Room has been requested for creation.");
        }, error => {
            alert("Room creation error. Error message: " + error.status + " - " + error.value);
        });

    }

    listRooms() : Observable<Room[]>{
        return this.http.get<Room[]>(API_URL.nodejs_url + '/rooms',
          {observe: 'body', responseType: 'json'});
    }
}
