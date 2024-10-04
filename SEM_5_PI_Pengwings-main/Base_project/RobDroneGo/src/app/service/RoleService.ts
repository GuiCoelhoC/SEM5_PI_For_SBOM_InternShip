import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { API_URL } from "../../../config";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private http: HttpClient) {
  }

  createRole(name: string) {
    const body = {name: name};
    return this.http.post<any>(API_URL.nodejs_url + '/roles', body).subscribe((response)=> {
        alert('Role created successfully');
    }, error => {
      alert('Error creating role: '+ error.status + ' - ' + error.value );
    });
  }

  listRoles(): Observable<any> {
    return this.http.get<any>(API_URL + '/api/roles',
      {observe: 'body', responseType: 'json'});
  }
}
