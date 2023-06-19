import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Login } from '../modal/login';
import { Signup } from '../modal/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {

  private authenticated: boolean = false;

  addUser(signup: Signup): Observable<Signup> {
    return this.httpClient.post<Signup>('http://localhost:8088/api/user/register', signup);
  }

  constructor(private httpClient: HttpClient) {}

 
  getusers(userr: Login) {
    console.log("GET USER");
    console.log(userr.username);
    console.log(userr.password);
    this.authenticated = true;
    return this.httpClient.post<any>(`http://localhost:8088/api/users/login`, userr, { headers: new HttpHeaders().set('responseType', 'text') }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', userr.username);
          let tokenStr = userData.token;
          console.log("Token string: " + tokenStr);
          localStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    );
  }

  getUserByUsername(username:string){
    return this.httpClient.get<any>(`http://localhost:8088/api/user/details/${username}`);
  }

  isAuthenticated():boolean{
    return this.authenticated;
  }

  setBearerToken(token: string) {
    sessionStorage.setItem('token', token);
  }
}
