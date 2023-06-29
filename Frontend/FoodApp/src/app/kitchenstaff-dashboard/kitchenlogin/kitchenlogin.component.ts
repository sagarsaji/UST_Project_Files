import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/authservice/user-auth.service';
import { Login } from 'src/app/modal/login';
import { AuthenticateServiceService } from 'src/app/service/authenticate-service.service';

@Component({
  selector: 'app-kitchenlogin',
  templateUrl: './kitchenlogin.component.html',
  styleUrls: ['./kitchenlogin.component.css']
})
export class KitchenloginComponent implements OnInit{

  loginForm!: FormGroup;
  login:Login=new Login();
  private isAuthenticated:boolean=false;

  constructor(private formBuilder: FormBuilder,private authservice:AuthenticateServiceService,
    private route:Router,private userAuthService:UserAuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  restname!:string;

  onSubmit(){

    this.login.userName = this.loginForm.value.username;
    this.login.userPassword = this.loginForm.value.password;

    this.authservice.getusers(this.login).subscribe((data) => {
      this.authservice.setBearerToken(data['token']);

      
      console.log(data);

      if (data != null) {
        // localStorage.setItem("key", this.submitMessage);
        // this.flag = true;
        this.setAuthenticated(true);
        localStorage.setItem('kitchenuser',this.loginForm.value.username);
        
        this.userAuthService.setRoles(data.user.role);
        this.userAuthService.setToken(data.jwtToken);

        // if (data.user.userFirstName) {
        //   const restname = data.userFirstName;
        //   
        // }



          const role = data.user.role[0].roleName;
          if(role==='KitchenStaff'){
            this.route.navigate(['/kitchen']);
          }
          else{
            alert('You are not authorized to Login');
          }
        
      }
    },
    error => {
      console.log("error");
      alert('You have entered incorrect Username or Password!');
    });
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

}


