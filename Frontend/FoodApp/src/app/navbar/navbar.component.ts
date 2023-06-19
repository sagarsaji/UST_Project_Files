import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateServiceService } from '../service/authenticate-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private service:AuthenticateServiceService,private router:Router){}
  

  checkLogin(){
    if(!this.service.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }
    else{
      this.router.navigateByUrl('/menu');
    }
  }

}
