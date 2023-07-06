import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KitchenloginserviceService } from '../service/kitchenloginservice.service';

@Component({
  selector: 'app-kitchenstaff-dashboard',
  templateUrl: './kitchenstaff-dashboard.component.html',
  styleUrls: ['./kitchenstaff-dashboard.component.css']
})
export class KitchenstaffDashboardComponent {

  constructor(private route:Router,private auth:KitchenloginserviceService){}


  restname: string = localStorage.getItem('myrestauname') || '';


  isAuthenticatedUser(){
    return this.auth.isAuthenticatedUser();
  }

  logout(){
    this.auth.setAuthenticated(false);
    localStorage.clear();
    this.route.navigate(['/kitchenstaff/login']);
  }

}
