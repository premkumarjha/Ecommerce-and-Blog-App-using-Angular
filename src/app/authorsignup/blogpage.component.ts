import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { MatSelectChange } from '@angular/material/select';
import { take } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { startWith } from 'rxjs-compat/operator/startWith';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-blogpage',
  templateUrl: './blogpage.component.html',
  styleUrls: ['./blogpage.component.css']
})
export class BlogpageComponent implements OnInit {

  signupBlogForm: FormGroup;
  hide = true;
  authorid: string;
  constructor(@Inject(DOCUMENT) public document: Document, private fb: FormBuilder, public myservice: MyserviceService, public dialog: MatDialog, private router: Router, public auth: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signupBlogForm = this.fb.group({
      author: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  bloggerSignup() {

    console.log(this.signupBlogForm.value)
    //alert(" login");
    const url = "http://localhost:3000/course/authorsignup"
    this.myservice.bloggerSignup(url, this.signupBlogForm.value).subscribe(data => {
      console.log(data);
      if(data['message']=="by this name user alreday exist, please use some other name"){
        this._snackBar.open(data['message'], 'close', {
          //duration: 2000,
        });
        //this.signupBlogForm.reset();
       }else{
        this._snackBar.open("successfully signed Up", 'close', {
          //duration: 2000,
        });
        this.signupBlogForm.reset();
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

  // signup() {

  //   this.router.navigate(['/blogauthorsignup']);
  // }
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
  logout(){
    localStorage.removeItem('authorid');
    this.router.navigate(['/authorlogin']);
    // this.router.navigate(['/login']);
    // this.myservice.displayToolbar=false;
  }
}
