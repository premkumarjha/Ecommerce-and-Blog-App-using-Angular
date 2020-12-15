import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  items: any;
  carts: any[] = [];
  productlist: any
  counter: any = 0;
  itemcounter: any = 0;
  isDuplicates: any = true;
  count: any = 0;
  @ViewChild('image', {
    static: true
  }) image: ElementRef;

  selectedFiles: any
  selectedImages: any
  isValid: boolean = false;
  isProgress: boolean = false;
  message: string = "";
  //let name;
  name: any;
  selectFile: any;
  uploadProgress: any;
  alerts: any[] = [{
    type: '',
    msg: ``,
    timeout: 5000
  }];
  output: any;
  imagename: any;
  images: any;
  price: any;
  date: any;
  priceBeforeDiscount: any
  priceAfterDiscount: any
  constructor(public myservice: MyserviceService) { }

  ngOnInit(): void {
    this.getproduct();
  }


  addToCart(item, index) {
    //let val=0;
    //this.count=this.count+1;

    
    //this.counter=this.count;
    //filter return elements of array that meets condition, so check ki if length zer0 ,then add in carts array else, imcrease counter;
this.myservice.addToCart(item);
    
  }

  getproduct() {
    let display:any;

    
    const url = "http://localhost:3000/forgotpassword/productdeatil"
    this.myservice.getproducts(url).subscribe(result => {

      let result1:any={

        data:""
      }
      result1=result;
      console.log(result);

      console.log(result1.data);

    
//this.myservice.items=result.data  //ye error de eaha tha,data pe

     this.myservice.items = result1.data;

     
    
     console.log(display)
      //   this.image/png;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(data.data[0].img.data.data)));
      // const image=btoa(String.fromCharCode.apply(null, new Uint8Array(data.data[0].img.data.data)));

    })


  }
}
