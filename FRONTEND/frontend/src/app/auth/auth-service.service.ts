import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {
  token!: string;
  private readonly BASE_URL = 'https://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  get loggedInUser(): boolean {
    const token = localStorage.getItem('x-auth-token');
    return token ? true : false;
  }

  //--------------------------------------------------------------------------------------------------------------------\\
  // returns the auth token
  getToken() {
    return localStorage.getItem('x-auth-token');
  }
  //--------------------------------------------------------------------------------------------------------------------\\
  //registers the user
  signup(userusername: string, userpassword: string, userfirstname: string) {

    return this.httpClient.post(`${this.BASE_URL}/api/users/signup`, {
      username: userusername,
      password: userpassword,
      firstName: userfirstname
    });
  }
  //---------------------------------------------------------------------------------\\
  //logs the user in
  signin(userusername: string, userpassword: string) {
    return this.httpClient.post(`${this.BASE_URL}/api/auth`, {
      username: userusername,
      password: userpassword,
    });
  }
  //---------------------------------------------------------------------------------\\
  //logs the user out
  logout(): void {
    localStorage.removeItem('x-auth-token');
  }

}
//--------------------------------------------------End of File------------------------------------------------------------------\\