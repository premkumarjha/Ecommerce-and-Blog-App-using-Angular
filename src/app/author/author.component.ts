import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  blogData:any=[];
  authorid:any;
  edit:Boolean=false;
  editpostdata:any;
  displayeditdata:any={
    edit:false
  }
  constructor(private router: Router,public myservice: MyserviceService,private _snackBar: MatSnackBar,private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.loadAuthorPost();
    console.log(this.authorid);
    this.activatedRoute.paramMap.subscribe(
      data=>{
        console.log(data)
      }
     );
  }

  loadAuthorPost(){
    console.log(this.authorid);
    

    this.authorid=localStorage.getItem("authorid");
      const url="http://localhost:3000/course/getauthor/"
    this.myservice.eachAuthorData(url + this.authorid).subscribe(posts=>{

      //jab authorData:any[]=[]; tha to type error de raha tha yaha pe, but mai jab ->authorData:any=[];then type error hat gya;
    //this.myservice.authorData=posts;
   //this.postdata=posts;
   this.blogData=posts;
   console.log(this.blogData)

    },
    error=>{
      this._snackBar.open(error.message, 'close', {
        //duration: 2000,
      });
    })
  
    
  }
  logout(){
    localStorage.removeItem('authorid');
    this.router.navigate(['/authorlogin']);
    // this.router.navigate(['/login']);
    // this.myservice.displayToolbar=false;
  }
// getBlog(){
//   const url = "http://localhost:3000/course/getauthor"
//   this.myservice.getBlog(url).subscribe(data=>{

// this.blogData=data;
// console.log(this.blogData)
//   },
//   err=>{
// console.log(err);
//   })
  
// }
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
  this.router.navigate(['/postblog']);
}
editpost(editpost){
//editpost['_id']=true;
//editpost['edit']=true;
this.edit=true;
this.editpostdata=editpost;
this.displayeditdata=this.blogData.filter(data=>data['_id']==editpost['_id']);
//this.displayeditdata=
//this.displayeditdata['edit']=true;
console.log(this.displayeditdata)
}
deletepost(deletedata){
  console.log(deletedata);
  const url = "http://localhost:3000/course/delete/";
  this.myservice.deletepost(url +deletedata._id ).subscribe(data=>{
    console.log(data);
    this.loadAuthorPost();
  },
 error=>{
  console.log(error.message);
  this._snackBar.open(error.message, 'close', {
    //duration: 2000,
  });
 }
  )
}

updatepost(data){
  this.edit=false;
  console.log(data)
  const url = "http://localhost:3000/course/edit/";
this.myservice.editauthorpost(url + data._id, data).subscribe(data1=>{
console.log(data);
this.loadAuthorPost();
},
error=>{
  console.log(error.message);
  this._snackBar.open(error.message, 'close', {
    //duration: 2000,
  });
})
  
}
}
