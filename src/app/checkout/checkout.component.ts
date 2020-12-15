import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  hide = true;
  billinForm: FormGroup;
  totalCost = 0;
  constructor(private fb: FormBuilder, public myservice: MyserviceService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    let price = 0;

    this.billinForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
      mobile: ['', Validators.required],
      firstaddress: ['', Validators.required],
      secondaddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      password: ['', Validators.required],
      paymentmode: ['', Validators.required],
    });

    this.myservice.cartArray.forEach(data => {
      length += data.count;
      //this.myservice.emitcartcountd(length);
      console.log(length);
      price += data.priceAfterDiscount * data.count;
      this.totalCost = price
      console.log(price)
    })
  }
  confirmPlaceOrder() {


    const url = "http://localhost:3000/forgotpassword/billing"

    //billing info save karna database

    //product order summery->jo hame cart wale component se mil jayega, ko  bhi database me save karna and Admin ko dikhna chahiye ki kaya aur kaha order dena hai

    //payment stripe pe redirect karna hai
    //console.log(this.billinForm)
    this.myservice.postBillingInfo(url, this.billinForm.value).subscribe(data => {

      console.log(data)
    })

    this.router.navigate(['/stripe'])
    alert("you billing info has been saved")

    // console.log("hii")
  }
  continueShopping() {
    this.router.navigate(['/productlist'])

  }

  payNow() {
    const url = "http://localhost:3000/forgotpassword/payment"
    console.log(this.totalCost)
    //alert(this.totalCost)
    this.myservice.payment(url, this.totalCost).subscribe(data => {

      console.log(data)
    })
  }

}



