import { Component } from '@angular/core';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  private isAuthenticated:boolean=false;
  constructor(private route:Router){}

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }

  setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }

  adminLogout() {
    this.setAuthenticated(false);
    localStorage.removeItem('token');
    this.route.navigate(['/admin/login']);
  }

}
