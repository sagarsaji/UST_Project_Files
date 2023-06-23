import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../modal/login';
import { AuthenticateServiceService } from '../service/authenticate-service.service';
import { RouterServiceService } from '../service/router-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = new Login();
  loginForm: FormGroup;
  submitMessage!: string;
  flag: boolean = false;
  usertype!: string;
  userid!: any;
  myid!: any;
  private isAuthenticated = false;

  constructor(
    private routerService: RouterServiceService,
    private authservice: AuthenticateServiceService,
    private route: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.isAuthenticated = !!localStorage.getItem('token');
    this.authservice.retrieveUserId();
  }

  onSubmit() {
    this.login.username = this.loginForm.value.username;
    this.login.password = this.loginForm.value.password;

    this.submitMessage = this.loginForm.value.username;

    this.authservice.getusers(this.login).subscribe(
      (data) => {
        this.authservice.setBearerToken(data['token']);

        if (data != null) {
          localStorage.setItem('token', this.submitMessage);
          localStorage.setItem('username',this.login.username);
          this.flag = true;

          this.authservice.getUserByUsername(this.login.username).subscribe(
            (response: any) => {
              if (response.token) {
                this.setAuthenticated(true);
              }
              this.userid = response.id;
              // console.log("this is my id " + this.userid)
              localStorage.setItem('myuseridd', this.userid);

              this.usertype = response.type;
              if (this.usertype == 'user') {
                this.route.navigate(['/user']);
              } else {
                alert('You are not authorized to login.');
              }
            },
            (error) => {
              console.log('error');
              alert('You have entered incorrect details.');
            }
          );
        }
      },
      (error) => {
        console.log('error');
        alert('You have entered incorrect username or password!');
      }
    );
  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }

  setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }

  logout() {
    this.setAuthenticated(false);
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

  idnum = localStorage.getItem('myuseridd');

  // sendidtoservice(){
  //     return this.authservice.retrieveUserId(this.idnum);
  // }

  
}
