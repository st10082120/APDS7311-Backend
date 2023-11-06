import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {
  token!: string;
  private readonly BASE_URL = `${environment.BaseUrl}`;
  constructor(private httpClient: HttpClient) { }
  Users: User[] = [];
  
  // returns the authtoken
  getCurrentToken() {
    return localStorage.getItem('x-auth-token');
  }
  //--------------------------------------------------------------------------------------------------------------------\\
  //registers the new user
  signupNewUser(userusername: string, userpassword: string, userfirstname: string) {

    return this.httpClient.post<User>(`${this.BASE_URL}/api/users/signup`, {
      username: userusername,
      password: userpassword,
      firstName: userfirstname
    });
  }
  //---------------------------------------------------------------------------------\\
  //logs the user in
  signinUser(userusername: string, userpassword: string) {
    return this.httpClient.post(`${this.BASE_URL}/api/auth`, {
      username: userusername,
      password: userpassword,
    });
  }
  //---------------------------------------------------------------------------------\\
  //logs the user out
  logoutUser(): void {
    localStorage.removeItem('x-auth-token');
  }
  //--------------------------------------------------------------------------------------------------------------------\\
  //check if a user is logged in
  get loggedInUser(): boolean {
    const token = localStorage.getItem('x-auth-token');
    return token ? true : false;
  }
}
//--------------------------------------------------End of File------------------------------------------------------------------\\