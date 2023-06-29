import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
    this.storeValuesInNewCart();
    
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
    // location.reload();
  }

  calculateTotal() {
    let total = 0;
    for (let cartItem of this.cartItem) {
      if (cartItem.price !== undefined && cartItem.quantity !== undefined) {
        //let price = parseInt(cartItem.price);
        // total += cartItem.total;
        total += cartItem.price*cartItem.quantity;
      }
    }
    return total;
  }

  calculateQuantity() {
    let qty = 0;
    for (let cartItem of this.cartItem) {
      if (cartItem.price !== undefined && cartItem.quantity !== undefined) {
        qty += cartItem.quantity;
      }
    }
    return qty;
  }
  
  

  

  checkLog(): void {
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.storeValuesInNewCart();
    }
  }

  
  
  increment(cartid: number){
    this.cartser.updateIncrement(cartid).subscribe(
      (data) => {
        location.reload();
        console.log(data);
      }
    )
  }

 


  decrement(cartid: number){
    this.cartser.updateDecrement(cartid).subscribe(
      (data) => {
        location.reload();
        console.log(data);
      }
    )
  }

  gettotal(cartid: number){
    let total=0;
    this.cartser.getTotal(cartid).subscribe(
      (data: number) => {
        total = data;
      }
    )
    return total;
  }

    
}

