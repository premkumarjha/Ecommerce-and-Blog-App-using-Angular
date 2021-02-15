import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { MatSelectChange } from '@angular/material/select';
import { take } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { startWith } from 'rxjs-compat/operator/startWith';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-blog-login',
  templateUrl: './blog-login.component.html',
  styleUrls: ['./blog-login.component.css']
})
export class BlogLoginComponent implements OnInit {
  loginBlogForm: FormGroup;
  hide = true;
  postdata:any=[];
  authorid: string;
 
  
  constructor(@Inject(DOCUMENT) public document: Document, private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog, private router: Router, public auth: AuthService, private _snackBar: MatSnackBar,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.loginBlogForm = this.fb.group({
      author: ['', Validators.required],
      password: ['', Validators.required],
    });
    
  }
  bloggerlogin() {

    console.log(this.loginBlogForm.value)
    //alert(" login");
    const url = "http://localhost:3000/course/authorlogin"

   // const url1="http://localhost:3000/course/getauthor/"
    this.myservice.bloggerlogin(url, this.loginBlogForm.value).subscribe(data => {
      //console.log(data['user'][0]['author']);
      console.log(data);
      console.log(data['message'])
      if(data['message']=="invalid password"){
        this._snackBar.open(data['message'], 'close', {
          //duration: 2000,
        });
      }else if(data['message']=="user not found"){
        this._snackBar.open(data['message'], 'close', {
          //duration: 2000,
        });
      }else{
      console.log(data['user'][0]['_id']);
      localStorage.setItem("authorid",data['user'][0]['_id']);
      localStorage.setItem("name",data['user'][0]['author'])
      this.myservice.sendauthorcontent(data['user'][0]['_id']);
      //
     this.router.navigate(['/author',data['user'][0]['_id']]);
      }
    },
      error => {
        console.log(error.message);
        this._snackBar.open(error.message, 'close', {
          //duration: 2000,
        });
      }
    )

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
   // this.myservice.isSignup=true;
    console.log("authorSignup");
    this.router.navigate(['/authorsignup']);
  }
  logout(){
    localStorage.removeItem('authorid');
    this.router.navigate(['/authorlogin']);
    // this.router.navigate(['/login']);
    // this.myservice.displayToolbar=false;
  }
}
