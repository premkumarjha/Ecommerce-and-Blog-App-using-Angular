import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
//import { totalmem } from 'os';
import { MyserviceService } from '../myservice.service';
import { SuccessComponent } from '../success/success.component';

declare var paypal;

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {

  @ViewChild('paypal', {static: true}) paypalRef: ElementRef;

  constructor(private fb: FormBuilder,public myservice: MyserviceService, public dialog: MatDialog,private router: Router) { }
  totalCost=0;
url="";
  // products={
  //   description:"shirts pents curtains",
  //   price:489
  // }
  ngOnInit(): void {
    let price=0;
    this.myservice.cartArray.forEach(data=>{
      length+=data.count;
            //this.myservice.emitcartcountd(length);
           console.log(length);
           price+=data.priceAfterDiscount*data.count;
           this.totalCost=price
           console.log(price)
          })


    console.log(this.paypalRef.nativeElement)
    
    paypal.Button.render({
      env: 'sandbox', // Or 'production'

      // Set up the payment:
      // 1. Add a payment callback
      
      payment: function(data, actions) {
        
        // 2. Make a request to your server
        return actions.request.post('http://localhost:3000/forgotpassword/my-api/create-payment/',{a:price})  //{a:this.totalcost}
          .then(function(res) {
            // 3. Return res.id from the response
            //console.log(data.paymentID);
           // console.log(data.payerID)
            console.log(res)
            return res.id;
          });
      },

      // Execute the payment:
      // 1. Add an onAuthorize callback

      onAuthorize: function(data, actions) {
        // 2. Make a request to your server
       
        console.log(data)
        return actions.request.post('http://localhost:3000/forgotpassword/my-api/execute-payment/',{a:price}, {
          paymentID: data.paymentID,
          payerID:   data.payerID
        })
          .then(function(res) {
            // 3. Show the buyer a confirmation message.
            console.log(res);
           
            //const returnUrl=res.returnUrl;
            console.log(data.returnUrl)
            //window.open(data.returnUrl)
            window.location.href = data.returnUrl;
            const dialogRef = this.dialog.open(SuccessComponent, { disableClose: true});
            dialogRef.afterClosed().subscribe(data=>{
              // this.getData();
             })
            //history.back(); 

  //this.router.navigate(['/productlist'])

          }).catch(err=>{
            window.location.href = data.returnUrl;
          })
      },
      onError:error=>{

        console.log(error)
      }
      
    }, '#paypal-button'); //this.paypalRef.nativeElement
}
}
