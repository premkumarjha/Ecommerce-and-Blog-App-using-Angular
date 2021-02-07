import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
//login:Boolean=true;
  blogData:any;
  //login:any;
  authorid: any;
  loginsignup: Boolean=false;
  
  constructor(private router: Router,public myservice: MyserviceService) {
    myservice.displayToolbar=false;
   }

  ngOnInit(): void {
    this.authorid=localStorage.getItem("authorid");
    if(this.authorid==undefined){
      this.loginsignup=true;
    }
    
//var x = str.replace(/\\/g, '');
    //console.log((this.router.url).replace(/\\//, ''))
    this.getBlog();
  }

  logout(){
    localStorage.removeItem('authorid');
    this.router.navigate(['/authorlogin']);
    // this.router.navigate(['/login']);
    // this.myservice.displayToolbar=false;
  }
getBlog(){
    
  const url = "http://localhost:3000/course/getauthor"
  this.myservice.getBlog(url).subscribe(data=>{

this.blogData=data;
console.log(this.blogData)
  },
  err=>{
console.log(err);
  })
  
}
//like count
like(index){

  const url = "http://localhost:3000/course/edit/";
  
index['likes']=index.likes+1
  console.log(index)
  this.myservice.blogLikes(url + index._id, index).subscribe(data => {  
    console.log(data);
    //below code is just to send lates fetched data and send to  event...
    //this.getBlog()
  },
    error => {
      
      console.log(error);
      //this.getBlog()
    })
}
//dislike count
dislike(index){
  //console.log(index);
  const url = "http://localhost:3000/course/edit/";
  
index['dislike']=index.dislike+1
  console.log(index)
  this.myservice.blogLikes(url + index._id, index).subscribe(data => {  
    console.log(data);
    //below code is just to send lates fetched data and send to  event...
    //this.getBlog()
  },
    error => {
      
      console.log(error);
      //this.getBlog()
    })
}

addpost(){
  this.authorid=localStorage.getItem("authorid");
    if(this.authorid==undefined){
      alert("please login first");
    }else{
      this.router.navigate(['/postblog']);
    }

}
authorLogin(){
  console.log("authorLogin");
  //this.authorid=localStorage.getItem("authorid");
  
  this.router.navigate(['/authorlogin']);
}

authorSignup(){
  console.log("authorSignup");
  this.router.navigate(['/authorsignup']);
}
}
