import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Building} from "../../interface/building";
import {Elevator} from "../../interface/elevator";
import {Observable} from "rxjs";
import {API_URL} from "config";
import {AuthService} from "../AuthService";

@Injectable({
    providedIn: 'root'
})
export class ElevatorService {

    constructor(private http: HttpClient,private authService: AuthService) {
    }

    createElevator(buildingCode: string | undefined, floors: number[] | undefined, brand: string | undefined, model: string | undefined, serialNumber: string | undefined, description: string | undefined) {
        const body = {
            building: buildingCode,
            floors: floors,
            brand: brand,
            model: model,
            serialNumber: serialNumber,
            description: description,
            token: this.authService.getToken()
        };
        console.log(body);
        if (model === undefined){
          body.model = " ";
        }
        if (serialNumber === undefined){
          body.serialNumber = " ";
        }
        if (description === undefined){
          body.description = " ";
        }
        this.http.post(API_URL.nodejs_url + '/elevator', body).subscribe((response: any) => {
            alert("Elevator " + buildingCode + "-E created with success!");
        }, error => {
            alert("Elevator creation error. Error message: " + error.status + " - " + error.value);
        });

    }

    updateElevator(code: string | undefined, floors: number[] | undefined, brand: string | undefined, model: string | undefined, serialNumber: string | undefined, description: string | undefined) {
        const body = {
            code: code,
            floors: floors,
            brand: brand,
            model: model,
            serialNumber: serialNumber,
            description: description,
            token: this.authService.getToken()
        };
      if (model === undefined){
        body.model = " ";
      }
      if (serialNumber === undefined){
        body.serialNumber = " ";
      }
      if (description === undefined){
        body.description = " ";
      }
        this.http.patch(API_URL.nodejs_url + '/elevator', body).subscribe((response: any) => {
                alert("Elevator update response received!");
            }, error => {
                alert("Elevator update error. Error message: " + error.status + " - " + error.value);
            }
        );
    }

    listElevatorByBuilding(building: string | undefined) : Observable<Elevator[]> {
      //alert("Listing elevators...");
        return this.http.get<Elevator[]>(API_URL.nodejs_url + '/elevator?building=' + building+"&token="+this.authService.getToken(),
          {observe: 'body', responseType: 'json'});
    }

  listElevators() {
    return this.http.get<Elevator[]>(API_URL.nodejs_url + '/elevator/all?token='+this.authService.getToken(),
      {observe: 'body', responseType: 'json'});
  }
}
