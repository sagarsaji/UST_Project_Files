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
  restnme = localStorage.getItem('restaurantname');

  ngOnInit(): void {
    // this.userid = this.route.snapshot.params['userid'];
    // console.log(this.userid);
    this.checkLog();
    // this.storeValuesInNewCart();
    
  }


  storeValuesInNewCart(): void {
    if (this.restnme && this.useridd) {
      this.cartser.getCartDetails(this.useridd).subscribe(
        (data) => {
          this.cartItem = data;
          if (this.cartItem) {
            const filteredMenuItems = this.cartItem.filter((item) => item.restname === this.restnme);
            console.log(filteredMenuItems);
            this.cartItem = filteredMenuItems;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  

  

  checkLog(): void {
    if (!this.service.isAuthenticated()) {
      this.cartItem = [];
      localStorage.removeItem('restaurantname'); // Remove restaurant name from localStorage
    } else {
      this.storeValuesInNewCart();
    }
  }

  // quaincre(){
  //   this.cartser.incrementQuantity()
  // }
  
  increment(cartid: number){
    
  }

    
}

