import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KitchenloginserviceService {

  constructor() {
    this.checkAuthentication();
   }

  public isAuthenticated:boolean=false;

  isAuthenticatedUser(){
    return this.isAuthenticated;
  }

  setAuthenticated(status: boolean){
    this.isAuthenticated = status;
  }

  private checkAuthentication() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('myuseridd');
    this.isAuthenticated = !!token && !!userId;
  }


}
