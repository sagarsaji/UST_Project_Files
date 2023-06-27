import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateServiceService } from 'src/app/service/authenticate-service.service';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  paymentForm!: FormGroup;
  showSuccess: boolean = false;


  constructor(private formBuilder: FormBuilder) { }

  username: string = localStorage.getItem('username') || '';


  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      name: [this.username, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cardNumber: ['', [Validators.required, Validators.maxLength(12)]],
      cardCvc: ['', [Validators.required, Validators.maxLength(3)]]
    });
  }

  submitForm() {
    if (this.paymentForm.valid) {
      // Perform form submission or other actions
      this.showSuccess = true;
    }
  }

  closeSuccessMessage() {
    this.showSuccess = false;
  }


}



