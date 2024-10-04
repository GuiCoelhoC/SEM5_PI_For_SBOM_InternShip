import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { API_URL } from 'config';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    constructor(private http: HttpClient) { }

    //global variable
    private token: string = '';

    signInWithGoogle(providerId: string) {
        //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    
    login(email: string, password: string) {
        const loginbody = {
            email: email,
            password: password
        };
        return this.http.post<any>(API_URL.dotnet_url + '/Auth/login', loginbody);
    }

    getRequestRole(token: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(API_URL.dotnet_url + '/Users/role?token=' + token, { responseType: 'text' }).subscribe(
                response => {
                    localStorage.setItem('token', token);
                    resolve(response);
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

    getToken(): string {
        return localStorage.getItem('token') as string;
    }
}

