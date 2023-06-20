import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Login } from '../modal/login';
import { Signup } from '../modal/signup';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {

  

  private authenticated: boolean = false;
  private tokenStr!: string;

  addUser(signup: Signup): Observable<Signup> {
    return this.httpClient.post<Signup>('http://localhost:8088/api/user/register', signup);
  }

  constructor(private httpClient: HttpClient,private route:Router) {}

 

  getusers(userr: Login) {
    console.log("GET USER");
    console.log(userr.username);
    console.log(userr.password);
    this.authenticated = true;
    return this.httpClient.post<any>(`http://localhost:8088/api/users/login`, userr, { headers: new HttpHeaders().set('responseType', 'text') }).pipe(
      map(
        userData => {
          localStorage.setItem('username', userr.username);
          this.tokenStr = userData.token;
          console.log("Token string: " + this.tokenStr);
          localStorage.setItem('token', this.tokenStr);
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

  setAuthenticated(status: boolean): void {
    this.authenticated = status;
  }

  logout() {
    this.authenticated = false;
    //this.tokenStr = '';
    //localStorage.removeItem('tokenStr');
    localStorage.removeItem('token');
    this.route.navigate(['/user']);
  }

  setBearerToken(token: string) {
    localStorage.setItem('token', token);
  }
}
