import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Orderhistory } from 'src/app/modal/orderhistory';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.css']
})
export class UserordersComponent implements OnInit{

  myid: number = Number(localStorage.getItem('myuseridd'));
  constructor(private orderser:RestaurantService){}

  myorder:Orderhistory[]=[];
  sortedorder:Orderhistory[]=[];

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderser.getUserOrders(this.myid).subscribe(
      (data: any) => {
        this.myorder = data;
        this.sortedorder = this.myorder.sort((a, b) => a.cartid - b.cartid);
        console.log(this.myorder);
      }
    );
  }
  

}
