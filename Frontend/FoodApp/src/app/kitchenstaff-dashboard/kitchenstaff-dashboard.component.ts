import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KitchenloginserviceService } from '../service/kitchenloginservice.service';
import { AuthenticateServiceService } from '../service/authenticate-service.service';

@Component({
  selector: 'app-kitchenstaff-dashboard',
  templateUrl: './kitchenstaff-dashboard.component.html',
  styleUrls: ['./kitchenstaff-dashboard.component.css']
})
export class KitchenstaffDashboardComponent {

  constructor(private route:Router,private auth:KitchenloginserviceService,
    private log:AuthenticateServiceService){}


  restname: string = localStorage.getItem('myrestauname') || '';


  isAuthenticatedUser(){
    return this.auth.isAuthenticatedUser();
  }

  isLoggedIn(){
    return this.log.isAuthenticated();
  }

  logout(){
    this.auth.setAuthenticated(false);
    this.log.setAuthenticated(false);
    localStorage.clear();
    this.route.navigate(['/kitchenstaff/login']);
  }

}
