import { Component, OnInit } from '@angular/core';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { Router } from '@angular/router';
import { AdminloginserviceService } from '../service/adminloginservice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  
  constructor(private route:Router,private auth:AdminloginserviceService){}

  ngOnInit(): void {
    this.isAuthenticatedUser();
  }

  isAuthenticatedUser(){
    console.log(this.auth.isAuthenticatedUser());
    return this.auth.isAuthenticated;
  }
  

  adminLogout() {
    this.auth.isAuthenticated=false;
    localStorage.clear();
    this.route.navigate(['/admin/login']);
  }

}
