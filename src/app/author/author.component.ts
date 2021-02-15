import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isLike:Boolean=false;
  isDislike: boolean=false;
  writecomment:Boolean=false;
  displaypost: boolean=false;
  postCommentForm: FormGroup;
  name: string;
  dateAndTime;
  hideeditcomment:Boolean;
  authorimage: any;
  constructor(private router: Router,public myservice: MyserviceService,private _snackBar: MatSnackBar,private activatedRoute: ActivatedRoute,private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.authorid=localStorage.getItem("authorid");
    if(this.authorid==undefined){
      this.router.navigate(['/authorlogin']);
    }else{
      this.loadAuthorPost();
    console.log(this.authorid);
    this.activatedRoute.paramMap.subscribe(
      data=>{
        console.log(data)
      }
     );

     this.authorid=localStorage.getItem("authorid");
      if(this.authorid !==undefined){
        this.isLike=true;
        this.isDislike=true;
      }
    }
    //comment section
    this.dateAndTime=new Date(); 
    this.name=localStorage.getItem('name');
    this.postCommentForm = this.fb.group({
      comment: ['', Validators.required],
      //password: ['', Validators.required],
      name:[this.name],
      createdAt:[this.dateAndTime]
    });
   
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
//to hide edit button in comment
  //  this.blogData.filter(data1=>{

  //   data1.comments.filter(data=>{
    
  //   if(data.name==data1.name){
  //   this.hideeditcomment=true;
  //   }else{
  //     this.hideeditcomment=false;
  //   }
  //   })
  //   })
  this.authorimage=this.blogData.find(data=>data.name==this.name);
 // console.log(this.authorimage)
   this.blogData['displaycommnet']=false;
  this.blogData['writecomment']=false;
  this.blogData.forEach(element => {

    element.comments.filter(data=>{
      data.edit=false;
      data.hideeditcomment=false;
      console.log("helooooooooooooooooo:",data)
      if(data.name ==localStorage.getItem('name')){
        data.hideeditcomment=true;
      }else{
        this.hideeditcomment=false;
      }
    })
  })

   console.log(this.blogData);
  this.blogData= this.blogData.filter(data=>{
     data.edit=false;
     return data;
   })
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
this.blogData=this.blogData.filter(data=>{
  if(data['_id']==editpost['_id']){
data.edit=true;
  }else{
    data.edit=false;
  }
  return data;

//this.displayeditdata=
//this.displayeditdata['edit']=true;

})
console.log(this.blogData)
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
console.log("in update method",data)
this.loadAuthorPost();
},
error=>{
  console.log(error.message);
  this._snackBar.open(error.message, 'close', {
    //duration: 2000,
  });
})
  
}

writeComment(blg){
  console.log(blg);
  this.dateAndTime=new Date(); 
  blg['writecommnet']=!blg['writecommnet'];
  
//this.writecomment=!this.writecomment;
}
displayComments(blg){
  blg['displaycommnet']=!blg['displaycommnet'];
this.displaypost=!this.displaypost;
}
//const url = "http://localhost:3000/course/getauthor"
postComments(blog){
 // this.dateAndTime=new Date(); 
  this.name=localStorage.getItem('name');
  const url = "http://localhost:3000/course/postcomments/";
  console.log(blog);
  console.log(this.postCommentForm.value);
  this.myservice.postsComments(url + blog._id,this.postCommentForm.value).subscribe(data=>{
    console.log("commment:",data);
    console.log(data)
  
    this.postCommentForm.reset();
   // this.writecomment=false;
    this.loadAuthorPost();
  })
  }

  editComment(cmnt,blg){
    this.dateAndTime=new Date(); 
    cmnt['edit']=true;
  console.log(cmnt,blg);
  

  }
saveEditedComment(cmnt,blg){
  console.log(cmnt,blg); 
  const url="http://localhost:3000/course/editcomment/"
  cmnt.createdAt=new Date();
  this.myservice.editComment(url + blg._id,cmnt).subscribe(data=>{
    console.log("edited comment:",data);
    this.loadAuthorPost();
  })
}
  deleteComment(cmnt,blg){
    console.log(cmnt,blg)
    //deletecomment
    let commentid={"_id":cmnt._id};
    const url="http://localhost:3000/course/deletecomment/"
    this.myservice.deleteComment(url + blg._id,cmnt).subscribe(data=>{
      console.log("deleted comment:",data);
      this.loadAuthorPost();
    })
  }
}
