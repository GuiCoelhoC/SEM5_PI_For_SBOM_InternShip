import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Floor} from "../interface/floor";
import { API_URL } from "../../../config";
import { Observable } from "rxjs";
import {AuthService} from "./AuthService";

@Injectable({
  providedIn: 'root'
})

export class FloorService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createFloor(floorNumber: string, description: string, length: string, width: string, buildingCode: string | undefined) {
    const body = {
      floorNumber: floorNumber,
      description: description,
      width: width,
      length: length,
      building: buildingCode,
      token: this.authService.getToken()
    };
    this.http.post (API_URL.nodejs_url + '/floor', body).subscribe((response: any) => {
        alert('Floor created successfully');
    }, error => {
      alert('Error creating floor: '+ error.status + ' - ' + error.value );
    });

  }

  updateFloor(oldFloorNumber: number | undefined, floorNumber: string, description: string, buildingCode: string | undefined) {
    const body = {
      oldFloorNumber: oldFloorNumber,
      floorNumber: floorNumber,
      description: description,
      building: buildingCode,
      token: this.authService.getToken()
    };
    this.http.patch(API_URL.nodejs_url + '/floor', body).subscribe((response: any) => {
      alert('Floor updated successfully');
    }, error => {
      alert('Error updating floor: '+ error.status + ' - ' + error.value);
    });
  }

  getFloorList(buildingCode: string | undefined) : Observable<Floor[]> {
    return this.http.get<Floor[]>(API_URL.nodejs_url + '/floor?building=' + buildingCode+ '&token=' + this.authService.getToken(),
    {observe: 'body', responseType: 'json'});
  }

  getFloorListWithPassage(buildingCode: string | undefined) : Observable<Floor[]> {
    return this.http.get<Floor[]>(API_URL.nodejs_url + '/floor/all-with-passage?building=' + buildingCode+ '&token=' + this.authService.getToken(),
    {observe: 'body', responseType: 'json'});
  }

}
