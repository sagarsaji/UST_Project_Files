import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Addtocart } from '../modal/addtocart';
import { Menu } from '../modal/menu';
import { RestaurantService } from '../service/restaurant.service';
import { SharedmenuserviceService } from '../service/sharedmenuservice.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {

  constructor(private cartser: RestaurantService, private router: Router,
    private route: ActivatedRoute, private sharedmenuu: SharedmenuserviceService) { }

  cart: Addtocart[] = [];
  userid!: number;

  ngOnInit(): void {
    this.userid = this.route.snapshot.params['userid'];
    console.log(this.userid);
    this.storeValuesInNewCart();
  }

  getNewMenuLength(): number {
    return this.sharedmenuu.newmenu.length;
  }

  storeValuesInNewCart(): void {
    const newmenu = this.sharedmenuu.newmenu;

    // Iterate over newmenu and create Cart objects
    for (const menuItem of newmenu) {
      const cartItem: Addtocart = {
        mpic: menuItem.mpic ?? '',
        mname: menuItem.mname ?? '',
        mprice: menuItem.mprice ?? '',
        restname: menuItem.restname ?? '',
        mid: menuItem.mid ?? '',
        quantity: 1,
        status: "in progress",
        userid: this.sharedmenuu.getuserid()
      };

      this.cart.push(cartItem);
    }

    console.log(this.cart);
  }
}
