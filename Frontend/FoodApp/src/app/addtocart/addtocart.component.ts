import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Addtocart } from '../modal/addtocart';
import { Menu } from '../modal/menu';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit{

  cart:Addtocart[] = [];
  constructor(private cartser:RestaurantService,private router:Router,private route: ActivatedRoute){}

  userid!: number;

  ngOnInit(): void {
    this.userid = this.route.snapshot.params['userid'];
    console.log(this.userid);
    this.getCartItems(this.userid);
  }

  getCartItems(userid: number) {
    this.cartser.getCartDetails(userid).subscribe(
      data => {
        this.cart = data;
      },
      error => {
        console.log('Error occurred while retrieving cart details:', error);
      }
    );
  }
  





}
