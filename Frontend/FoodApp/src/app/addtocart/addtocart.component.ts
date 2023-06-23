import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Addtocart } from '../modal/addtocart';
import { Menu } from '../modal/menu';
import { RestaurantService } from '../service/restaurant.service';
import { SharedmenuserviceService } from '../service/sharedmenuservice.service';
import { AuthenticateServiceService } from '../service/authenticate-service.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {

  constructor(private cartser: RestaurantService, private router: Router,
    private route: ActivatedRoute, private user: AuthenticateServiceService,
    private service:AuthenticateServiceService) { }

  
  cartItem:Addtocart[] = [];
  useridd = this.user.retrieveUserId();
  //useridd = localStorage.getItem('myuseridd');
  

  ngOnInit(): void {
    // this.userid = this.route.snapshot.params['userid'];
    // console.log(this.userid);
    this.checkLog();
    // this.storeValuesInNewCart();
  }


  storeValuesInNewCart(): void {
      this.cartser.getCartDetails(this.useridd).subscribe(
        (data) => {
          this.cartItem = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  checkLog():void{
    if(this.service.isAuthenticated()==false){
      this.cartItem = [];
    }
    else{
      this.storeValuesInNewCart();
    }
  }

  // quaincre(){
  //   this.cartser.incrementQuantity()
  // }
  

    
}

