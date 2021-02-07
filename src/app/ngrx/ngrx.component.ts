import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../model/data.model';
import { AppState } from '../app.state';
import * as ProductActions from '../actions/product.action'
import * as fromreducer from '../reducers/addproduct.reducer'
@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.css']
})
export class NgrxComponent implements OnInit {
  
  apiGetData$: Observable<boolean>;
  products: Observable<Product[]>;
displayProduct:any;
errorMessage:boolean=false;
  //product:any;
  inputData:any;
  message:string="please give some input";
  edit:boolean=false;
  articles$: Observable<any[]>
  

  constructor(private store: Store<AppState>) { 

    //this.articles$ = store.select(fromreducer.addProductReducer);
  }

  ngOnInit(): void {
    //console.log(this.product)

    //below line is to get data,product inside select is same as app module ke StoreModule.forRoot({product: addProductReducer})
    this.products = this.store.select('product');

    this.products.subscribe(data=>{
      console.log(data);
      this.displayProduct=data;
      this.inputData="";
    })

    //this.apiGetData$ = this.store.pipe(select(selectIsAuthenticated));
    
  }

  submit(){
if(this.inputData !==""){
  //dispatching action

  this.store.dispatch(new ProductActions.AddProduct({name: this.inputData}) )
} else if(this.inputData ==""){
  this.errorMessage=true;
  this.message="please five some input";
}
    
    
  }
  delete(value){
console.log(value);
this.store.dispatch(new ProductActions.RemoveProduct({name: value}) )

  }
  
  editdata(value,i){
this.edit=true;
value=this.inputData;
console.log(i)


  }
  updatedata(value,i){
    this.edit=false;
console.log(value, i)
value=this.inputData;
console.log(i)
  }

  // getp(){
  //   this.store.dispatch(new ProductActions.GetProduct({data:[]}))

  // }
}
