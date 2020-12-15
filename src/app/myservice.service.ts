import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Token } from '@angular/compiler/src/ml_parser/lexer';



@Injectable({
  providedIn: 'root'
})
export class MyserviceService {


   cartArray:any[]=[];
items:any=[];
filteredDataArray:any;
   price:any=0;
   cost=new Subject()

   //cartCounts:EventEmitter<any> = new EventEmitter();

   cartCount=new Subject();

// search(data){
// console.log("hii")
// this.cartArray.forEach(c=>{
//   if(c.imagename==data){
// this.filteredDataArray.push(c);
// console.log(this.filteredDataArray)
//   }
// })





//this.cartArray=this.filteredDataArray;

//}
   addToCart(item:any){

    //filter return array, so we can check length, any index's property
    
    if (this.cartArray.filter(c => { return c._id == item._id }).length == 0) {

     
//item object usme ham count ak prop dal rahe hai 

      item["count"] = 1; //or ite.count=1;

      //item.count=1;

      this.cartArray.push(item);

      console.log(this.cartArray)
      
//=this.cartArray.reduce((total,item)=>total+item.count,0)



      
    } else {
      this.cartArray.filter(c => { return c._id == item._id })[0].count += 1
      
      console.log("hii")

    }
    let length=0;
    this.cartArray.forEach(data=>{
  
      length+=data.count;
      console.log(length);
      this.cartCount.next(length);
     console.log(this.price);
    
    });
    

   }

   deleteFromCart(item,index){
    //this.cartArray.pop();
    //this.cartArray.filter((c) => c._id !==item._id );
    this.cartArray.splice(index, 1);
    let length=0;
    this.cartArray.forEach(data=>{
  
      length+=data.count;
      console.log(length);
      this.cartCount.next(length);
     console.log(this.price);
    
    });
    //this.totalamount();
   }

  //basically it is deacrement in count
  removeFromCart(item){

    if(item.count>1){
    this.cartArray.filter(c => { return c._id == item._id })[0].count -= 1
    }
    console.log("hii");  
  let length=0;
 // let totalCost=0;
  this.cartArray.forEach(data=>{

    length+=data.count;
    console.log(length);
    this.cartCount.next(length);
   console.log(this.price);
  
  });
  
  }


  result = new Subject<any>();

  addcoursedata = new Subject<any>();

  userRole=new Subject<any>()

  role=new Subject<any>()

  navchange: EventEmitter<any> = new EventEmitter();



  sendMessage(message: any) {
    this.result.next(message);
  }

  getMessage(): Observable<any> {
    return this.result.asObservable();
  }


  sendAdminRole(message: any) {
    this.role.next(message);
  }

  getAdminRole(): Observable<any> {
    return this.role.asObservable();
  }

  sendRole(message: any) {
    this.userRole.next(message);
  }

  getRole(): Observable<any> {
    return this.userRole.asObservable();
  }

//'Content-Type', 'application/json'

  private headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8')

   //headers.set('token',this.token)

  

  constructor(private http: HttpClient) { }
  //to update latest data in data table
  emitNavChangeEvent(number) {
    this.navchange.emit(number);
  }

  //to update latest data in data table
  getNavChangeEmitter() {
    return this.navchange;
  }

  sendAddCourseData(message) {
    this.addcoursedata.next(message);
  }

  getAddCourseData() {
    return this.addcoursedata;
  }
  postdata(url, body) {
    //stringfy karke bhi ham send kar sakte hai , no problem
    //let body1 = JSON.stringify(body);
    return this.http.post(url, body, { headers: this.headers });
  }

  getData(url) {

    return this.http.get(url);
  }
  editData(url,body){
    
   //yaha already body json object hai, and header content type bhi json , so no problem;
    return this.http.put(url, body, { headers: this.headers });
  }
  deletedata(url){
    //const body1 = JSON.stringify(body);
    return this.http.delete(url);
  }
  postSubjectData(url,body){
    return this.http.post(url, body, { headers: this.headers });
  }

  getSubjectData(url){

    return this.http.get(url);
  }

  uploadFile(url,body){

    return this.http.post(url, body, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadImage(url,body){

    return this.http.post(url, body, {
      reportProgress: true,
      observe: 'events'
    });
  }



  downloadFile(url){
    return this.http.get(url);
  }
  downloadImage(url){
    return this.http.get(url);
  }
  putEducator(url,value){

      //yaha value string hai, and body me hamesa json data bhejte hai, so  value (jo hame .ts file se mil raha hai) 
      //ko json fromat me chnage karna parega , so we have done {a:value}, now in route.js ->req.body.a, 
      //jaisa header content type liya ,data ko bhi usi format me send karna parta hai, most of time of application/json
      //but keep in mind body(jo route.js ke get.post put me req.body karte) me hamesa json data bhejte hai, so yaha put me data jo 
      //bhej rahe ho json me hi bhejo, and header to alreday json me hai hi

    return this.http.put(url, {a:value},{ headers: this.headers });
  }

  getEducator(url){
    return this.http.get(url);

  }

  login(url,body){
    return this.http.post(url, body, { headers: this.headers });

  }
  adminLogin(url,body){
    return this.http.post(url, body, { headers: this.headers });

  }
  userSignup(url,body){
    return this.http.post(url, body, { headers: this.headers });

  }
updatePassword(url,body){
  return this.http.put(url, body, { headers: this.headers });

}
  resetEmail(url,body){
    
 const token=localStorage.getItem('token');
// let headers:HttpHeaders = new HttpHeaders()
// headers.append('Content-Type', 'application/json');
// headers.append('token',token)

// const httpOptions:any={

//    headers:{
  
//     'Content-Type':'applictions/json',
//     'token':token
    
//     }
//     }
  
//headers.append();
//if not this means local ye method ka headers, if ude this then class ka hoga
return this.http.post(url, body, { headers: this.headers });
//headers: headers
  }

  sendProduct(url,body){
   //const body1= JSON.stringify(body);
    return this.http.post(url, body);

  }
  getproducts(url){
    return this.http.get(url);

  }
  
  postBillingInfo(url,body){
    return this.http.post(url, body, { headers: this.headers });

  }
serchProduct(url,data){

  return this.http.post(url,{a:data},{ headers: this.headers });
}

payment(url,body){

  //window.open(url)
  return this.http.post(url,{a:body},{ headers: this.headers });

}
generateToken(url,body){

  return this.http.post(url,body,{ headers: this.headers }).pipe()
}

sendToken(url,body){


  let token=localStorage.getItem('token');
console.log("hii")
console.log(token)
console.log("ram")

  
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': token,
     
    })
  };
 //let httpHeaders = new HttpHeaders().set('Authorization',token)  //ye bhi sahi hai, isko  {heareds:httpHeaders} aise bhejna parega.

//httpHeaders = httpHeaders.append('Authorization', token);

//httpHeaders = httpHeaders.append('ID', '001');


//headers.set('Authorization', `Bearer ${token}`);

//
  return this.http.post(url,body,httpOptions);
}
}
