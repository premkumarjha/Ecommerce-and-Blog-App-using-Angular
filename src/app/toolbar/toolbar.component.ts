import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  searchText:any;
   userRole=false;
badgeCount:any=0;
  constructor(private router: Router,private myservice: MyserviceService) {
    this.myservice.getRole().subscribe(data=>{
      this.userRole=data;
   })
  }

  ngOnInit(): void {
    console.log(this.userRole)
//this.badgeCount=this.myservice.badgeCount
    this.myservice.cartCount.subscribe(value=>{
      this.badgeCount=value;
console.log(value)
    })

  }
logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
search(){

  
console.log(this.searchText)
const url = "http://localhost:3000/forgotpassword/search";
this.myservice.serchProduct(url,this.searchText).subscribe(data=>{

  let abc:any={

    output:""
  }
abc=data;
console.log(abc.output)
this.myservice.items=abc.output;

  console.log(this.myservice.filteredDataArray)
})
//this.myservice.cartArray.filter(data)
}
// applyFilter(event: Event) {
//   console.log(event)
//   const filterValue = event.target;
//  // this.myservice.items = filterValue.trim().toLowerCase();
//   console.log(filterValue)
// const url = "http://localhost:3000/forgotpassword/search";
// this.myservice.serchProduct(url,this.searchText).subscribe(data=>{

  
// this.myservice.items=data.output;

//   console.log(this.myservice.filteredDataArray)
// })
// //this.myservice.cartArray.filter(data)
// }
}
