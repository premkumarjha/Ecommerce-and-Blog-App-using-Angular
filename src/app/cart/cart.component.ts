import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() cartsData: any
  checkoutbutton=false;
  //price: number;
  //counter=0;
  constructor(public myservice: MyserviceService, private router: Router) { }
  totalCost = 0;
  ngOnInit(): void {
    length = 0;
    let price = 0;
    console.log(this.cartsData)
    console.log(this.myservice.cartArray);
if(this.myservice.cartArray.length>0){
  this.checkoutbutton=true;
}
    //     this.myservice.cartArray.forEach(data=>{
    // length+=data.count;
    //       //this.myservice.emitcartcountd(length);
    //      console.log(length);
    //      price+=data.priceAfterDiscount*data.count;
    //      this.totalCost=price
    //      console.log(price)
    //     })

    this.totalamount();
  }

  removefromcart(item,index) {
    let price = 0;
    let length = 0;

    this.myservice.deleteFromCart(item,index);
    // if (this.myservice.cartArray.filter(data => { return data._id == item._id }).length != 0) {
    //   this.myservice.cartArray.pop();
    //   console.log(this.myservice.cartArray.length)
    // }
    this.totalamount();
    // this.myservice.cartArray.forEach(data=>{
    //   length+=data.count;
    //         //this.myservice.emitcartcountd(length);
    //        console.log(length);
    //        price+=data.priceAfterDiscount*data.count;
    //        this.totalCost=price
    //        console.log(price)
    //       })
  }
  increment(item) {
    console.log(item.count);
    let price = 0;
    let length = 0;
    //length=0;
    this.myservice.addToCart(item);
    this.totalamount();
    // this.myservice.cartArray.forEach(data=>{
    //   length+=data.count;
    //        console.log(length);
    //        price+=data.priceAfterDiscount*data.count;
    //        this.totalCost=price
    //        console.log(price)
    //       })

  };
  decreament(item) {
    let price = 0;
    let length = 0;
    this.myservice.removeFromCart(item);
    this.totalamount();

    //     this.myservice.cartArray.forEach(data=>{
    // length+=data.count;
    //       //this.myservice.emitcartcountd(length);
    //      console.log(length);
    //      price+=data.priceAfterDiscount*data.count;
    //      this.totalCost=price
    //      console.log(price)
    //     })

  }

  checkout() {
    //console.log("hii")
    this.router.navigate(['./checkout']);

  }

  totalamount() {
    let price = 0;
    let length = 0;
    this.myservice.cartArray.forEach(data => {
      //length += data.count;
      //this.myservice.emitcartcountd(length);
     // console.log(length);
      price += data.priceAfterDiscount * data.count;
      this.totalCost = price
      console.log(price)
    })

  }

}
