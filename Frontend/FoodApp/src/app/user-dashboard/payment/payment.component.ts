import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Addtocart } from 'src/app/modal/addtocart';
import { Kitchenstaff } from 'src/app/modal/kitchenstaff';
import { Orderhistory } from 'src/app/modal/orderhistory';
import { AuthenticateServiceService } from 'src/app/service/authenticate-service.service';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  showSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private orderser: RestaurantService
  ) {}

  username: string = localStorage.getItem('username') || '';
  myid: number = Number(localStorage.getItem('myuseridd'));

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      userid: [this.myid, Validators.required],
      name: [this.username, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cardNumber: ['', [Validators.required, Validators.maxLength(12)]],
      cardCvc: ['', [Validators.required, Validators.maxLength(3)]]
    });
    this.toOrders();
  }

  myorders: Addtocart[] = [];
  orderhistory: Orderhistory = new Orderhistory();

  toOrders() {
    this.orderser.getOrderByUserId(this.myid).subscribe((data) => {
      this.myorders = data;
      console.log(this.myorders);
    });
  }

  toKitchen() {
    // Check if myorders has a valid value before accessing its properties
    if (this.myorders.length > 0) {
      for (const order of this.myorders) {

        this.orderhistory.cartid = order.cartid;
        this.orderhistory.userid = order.userid;
        this.orderhistory.restname = order.restname;
        this.orderhistory.prodname = order.prodname;
        this.orderhistory.status = order.status;

        this.orderser.toOrderHistory(this.orderhistory).subscribe((data) => {
          console.log(data);
        });

        this.orderser.deleteByUserid(this.orderhistory.userid).subscribe((data)=>{
          console.log("deleted");
        })
      }
    }
  }

  submitForm() {
    if (this.paymentForm.valid) {
      this.showSuccess = true;
    }
  }

  closeSuccessMessage() {
    this.showSuccess = false;
  }
}
