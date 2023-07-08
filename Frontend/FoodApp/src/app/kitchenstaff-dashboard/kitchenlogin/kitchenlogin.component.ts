import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/authservice/user-auth.service';
import { Login } from 'src/app/modal/login';
import { AuthenticateServiceService } from 'src/app/service/authenticate-service.service';
import { KitchenstaffDashboardComponent } from '../kitchenstaff-dashboard.component';
import { KitchenloginserviceService } from 'src/app/service/kitchenloginservice.service';
import { AdminloginserviceService } from 'src/app/service/adminloginservice.service';

@Component({
  selector: 'app-kitchenlogin',
  templateUrl: './kitchenlogin.component.html',
  styleUrls: ['./kitchenlogin.component.css']
})
export class KitchenloginComponent implements OnInit{

  loginForm!: FormGroup;
  login:Login=new Login();

  constructor(private formBuilder: FormBuilder,private authservice:AuthenticateServiceService,
    private route:Router,private userAuthService:UserAuthService,
    private auth:KitchenloginserviceService,
    private admin:AdminloginserviceService) { }

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
        this.auth.setAuthenticated(true);
        this.authservice.setAuthenticated(false);
        this.admin.setAuthenticated(false);
        this.restname=data.user.userFirstName;
        localStorage.setItem('myrestauname',this.restname);
        this.userAuthService.setRoles(data.user.role);
        this.userAuthService.setToken(data.jwtToken);

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


}


