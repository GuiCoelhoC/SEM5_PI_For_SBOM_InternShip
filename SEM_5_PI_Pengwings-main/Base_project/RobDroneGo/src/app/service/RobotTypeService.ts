import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { API_URL } from "../../../config";
import {RobotType} from "../interface/robotType";
import {Observable} from "rxjs";
import {AuthService} from "./AuthService";

@Injectable({
  providedIn: 'root'
})

export class RobotTypeService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createRobotType(type: string, brand: string, model: string,tasks: string[]) {
    const body = {
      type: type,
      brand: brand,
      model: model,
      tasks: tasks,
      token: this.authService.getToken()
    };
    this.http.post (API_URL.nodejs_url + '/robotType', body).subscribe((response: any) => {
      alert('Robot type created successfully');
    }, error => {
      alert('Error creating robot type'+ error.status + ' - ' + error.value);
    });

  }

  getRobotTypes() : Observable<RobotType[]> {
    return this.http.get<RobotType[]>(API_URL.nodejs_url + '/robotType?token=' + this.authService.getToken(),
      {observe: 'body', responseType: 'json'});
  }
}
