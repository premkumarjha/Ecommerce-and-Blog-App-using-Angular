import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
//login:Boolean=true;
  krishana:any;
  blogData:any;
  welcome="Welcome"
  //login:any;
  authorid: any;
  loginsignup: Boolean=false;
  writecomment:Boolean=false;
  displaypost: boolean=false;
  postCommentForm: FormGroup;
  name: string;
  dateAndTime;
  hideeditcomment:Boolean;
  authorimage:any;
  databaseauthorimage:any[]=[];
  img: string;
  constructor(private router: Router,public myservice: MyserviceService,private fb: FormBuilder) {
    myservice.displayToolbar=false;
    this.name=localStorage.getItem('name');
    
   }

  ngOnInit(): void {
    this.getBlog();
    
    console.log("time is:",this.dateAndTime)
    this.authorid=localStorage.getItem("authorid");
    if(this.authorid==undefined){
      this.loginsignup=true;
    }
    this.dateAndTime=new Date(); 
    this.name=localStorage.getItem('name');
    const url = "http://localhost:3000/course/getauthor"
    this.myservice.getBlog(url).subscribe(data=>{

      this.blogData=data;
      this.krishana=this.blogData[13];
      this.blogData['displaycommnet']=false;
      this.blogData['writecomment']=false;
      //console.log(this.blogData)
      
      //find name off author so that his image can be..used:
      
      this.authorimage=this.blogData.find(data=>data.name==this.name);
      console.log(this.authorimage);
      //this.databaseauthorimage.push(this.authorimage.img);
//localStorage.setItem('image', JSON.stringify(this.authorimage.img));
//localStorage.setItem('image',this.authorimage.img)
// this.img=JSON.stringify(this.databaseauthorimage[0]['data']);
// localStorage.setItem('image',this.img );

    });
    //console.log(this.authorimage);
    this.postCommentForm = this.fb.group({
      comment: ['', Validators.required],
      //password: ['', Validators.required],
      name:[this.name=localStorage.getItem('name')],
      
      createdAt:[this.dateAndTime=new Date()],
     //authorimage:[this.authorimage=JSON.parse(localStorage.getItem('image'))]
      //authorimage:[localStorage.getItem('image')]
    });
  //  this.getBlog();
    console.log("name in localstorage is:",this.name)
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
this.krishana=this.blogData[13];
this.blogData['displaycommnet']=false;
this.blogData['writecomment']=false;
console.log(this.blogData)

//find name off author so that his image can be..used:

this.authorimage=this.blogData.find(data=>data.name==this.name);
//console.log(this.authorimage)

//to edit delete of comment
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
this.blogData= this.blogData.filter(data=>{
  data.edit=false;
  return data;
})
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
    
  
    this.postCommentForm.reset();
   // this.writecomment=false;
    this.getBlog();
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
    this.getBlog();
  })
}
  deleteComment(cmnt,blg){
    console.log(cmnt,blg)
    //deletecomment
    let commentid={"_id":cmnt._id};
    const url="http://localhost:3000/course/deletecomment/"
    this.myservice.deleteComment(url + blg._id,cmnt).subscribe(data=>{
      console.log("deleted comment:",data);
      this.getBlog();
    })
  }
}
