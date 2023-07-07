import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { Addtocart } from 'src/app/modal/addtocart';
import { AuthenticateServiceService } from 'src/app/service/authenticate-service.service';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { SharedmenuserviceService } from 'src/app/service/sharedmenuservice.service';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.css']
})
export class NavbaruserComponent {

  constructor(private router:Router,private authservice:AuthenticateServiceService,
    private sharemenu:SharedmenuserviceService,private cartser:RestaurantService){}

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

   toCart(){
    this.router.navigate(['/addtocart']);
   }
   

}
