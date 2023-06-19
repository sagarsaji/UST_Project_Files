import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateServiceService } from 'src/app/service/authenticate-service.service';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.css']
})
export class NavbaruserComponent {

  constructor(private service:AuthenticateServiceService,private router:Router){}

  // checkLogin(){
  //   if(!this.service.isAuthenticated()){
  //     this.router.navigateByUrl('/login');
  //   }
  //   else{
  //     this.router.navigateByUrl('/menu');
  //   }
  // }

}
