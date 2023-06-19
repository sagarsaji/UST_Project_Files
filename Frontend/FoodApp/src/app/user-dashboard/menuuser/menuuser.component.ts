import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { Addtocart } from 'src/app/modal/addtocart';
import { Menu } from 'src/app/modal/menu';
import { RestaurantService } from 'src/app/service/restaurant.service';

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
  userid!: number;
  cart:Addtocart = new Addtocart();

  constructor(private restService:RestaurantService,
    private router: Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.restn=this.route.snapshot.params['restname'];
    this.restname = this.restn;
    this.fetchSpecificRestaurantMenu(this.restname);
  }

  // logg!: LoginComponent;

  fetchSpecificRestaurantMenu(restname: string) {
    this.restService.getAllMenu().subscribe(data => {
      this.menu = data.filter(menuItem => menuItem.restname === restname);
      console.log(this.menu);
      this.router.navigate(['viewmenuuser', restname]);
    });
  }



  addtocart(){
    // this.userid = this.logg.userid;
    this.restService.toCart(this.cart).subscribe(data => {
      this.cartarray = data;
      console.log(data);
      //this.router.navigate(['addtocart',this.userid]);
    })
  }

}
