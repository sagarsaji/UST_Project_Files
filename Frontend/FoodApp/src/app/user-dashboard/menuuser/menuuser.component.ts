import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { Addtocart } from 'src/app/modal/addtocart';
import { Menu } from 'src/app/modal/menu';
import { AuthenticateServiceService } from 'src/app/service/authenticate-service.service';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { SharedmenuserviceService } from 'src/app/service/sharedmenuservice.service';

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.component.html',
  styleUrls: ['./menuuser.component.css']
})
export class MenuuserComponent {

  quantity: number = 0;

  menu: Menu[] = [];
  cartarray!: any;
  restaurant!: String;
  restn: any;
  restname: any;
  cart!: Addtocart;
 
  useridnum = localStorage.getItem('myuseridd');
  username = localStorage.getItem('username');

  constructor(private restService:RestaurantService,
    private router: Router,private route:ActivatedRoute,
    private sharedMenu:SharedmenuserviceService,
    private user:AuthenticateServiceService){}

  ngOnInit(): void {
    this.restn=this.route.snapshot.params['restname'];
    this.restname = this.restn;
    this.fetchSpecificRestaurantMenu(this.restname);
  }

  

  fetchSpecificRestaurantMenu(restname: string) {
    this.restService.getAllMenu().subscribe(data => {
      this.menu = data.filter(menuItem => menuItem.restname === restname);
      console.log(this.menu);
    });
  }

  newmenu: Menu[] = [];
  useridd = this.user.retrieveUserId();
  

  pushtomenu(menuItem: Menu) {
    this.newmenu.push(menuItem);
  }

  getMenuItems(): Menu[] {
    return this.sharedMenu.getMenu();
  }

  clearMenu() {
    this.sharedMenu.clearMenu()
  }

  // mymenu:Menu[] = this.getMenuItems();

  addtocart(menuu: Menu) {
    console.log(this.useridd);
    
    if (this.useridd !== null) {
      this.cart = new Addtocart();
      this.cart.userid = parseInt(this.useridd);
      this.cart.prodid = menuu.mid;

      this.cart.prodname = menuu.mname;
      console.log("test" + this.cart.prodname);
      this.cart.mpic = menuu.mpic;
      this.cart.price = menuu.mprice;
      this.cart.quantity = 1;
      this.cart.restname = menuu.restname;
      this.cart.status = 'Added to Cart';

      console.log(this.cart);
  
      this.restService.toCart(this.cart).subscribe(
        (data) => {
          alert("Added to Cart");
          console.log(this.cart);
        },
        (error) => {
          alert("Failed to add. Try again");
        }
      );
    } else {
      alert("User ID is null. Unable to add to cart.");
    }
  }
  
  
  



  // addtocart(){
  //   // this.userid = this.logg.userid;
  //   this.restService.toCart(this.cart).subscribe(data => {
  //     this.cartarray = data;
  //     console.log(data);
  //     //this.router.navigate(['addtocart',this.userid]);
  //   })
  // }
  // console.log(this.cart);
}
