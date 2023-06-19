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
  usertype!: String;

  constructor(private routerService: RouterServiceService, 
    private authservice: AuthenticateServiceService,private route:Router) {

    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    // if (sessionStorage.getItem('key') != null) {
    //   this.routerService.tohome();
    // }
  }

  userid!:number;

  onSubmit() {
    console.log("hi from loginsubmit");
    this.login.username = this.loginForm.value.username;
    this.login.password = this.loginForm.value.password;

    this.submitMessage = this.loginForm.value.username;

    console.log("Login Submit: " + this.loginForm.value);

    this.authservice.getusers(this.login).subscribe((data) => {
      
      this.authservice.setBearerToken(data['token']);
      
      console.log(data);

      if (data != null) {
        sessionStorage.setItem("key", this.submitMessage);
        this.flag = true;
        
        this.authservice.getUserByUsername(this.login.username).subscribe(
          (response:any) => {
            this.usertype = response.type;
            if(this.usertype == 'user'){
              this.route.navigate(['/user']);
            }
            else{
              alert("You are not authorized to Login");
            }
          },
          error => {
            console.log("error");
            alert('You have entered incorrect Details');
          }
        )
      }
    },
    error => {
      console.log("error");
      alert('You have entered incorrect Username or Password!');
    });
  }
}
