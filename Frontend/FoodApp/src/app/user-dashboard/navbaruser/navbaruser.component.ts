import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthenticateServiceService } from 'src/app/service/authenticate-service.service';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.css']
})
export class NavbaruserComponent {

  constructor(private router:Router,private authservice:AuthenticateServiceService){}

  // checkLogin(){
  //   if(!this.service.isAuthenticated()){
  //     this.router.navigateByUrl('/login');
  //   }
  //   else{
  //     this.router.navigateByUrl('/menu');
  //   }
  // }

  isLoggedin = this.authservice.isAuthenticated();
 
  isLoggedIn(): boolean {
    return this.authservice.isAuthenticated();
  }

    toggleLogin() {
      if (this.isLoggedIn()) {
        this.authservice.setAuthenticated(false);
        this.authservice.logout();
  
      } else {
        this.router.navigate(['/login']);
      }
    }
    

}
