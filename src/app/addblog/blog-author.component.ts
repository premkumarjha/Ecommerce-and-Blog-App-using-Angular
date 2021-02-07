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
  selector: 'app-blog-author',
  templateUrl: './blog-author.component.html',
  styleUrls: ['./blog-author.component.css']
})
export class BlogAuthorComponent implements OnInit {
  addBlogForm: FormGroup;
  hide = true;
  images: any;
  constructor(@Inject(DOCUMENT) public document: Document, private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog, private router: Router, public auth: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.addBlogForm = this.fb.group({
      author: ['', Validators.required],
      published: ['', Validators.required],
      title: ['', Validators.required],
      contents: ['', Validators.required],
    });
  }
  postBlog() {
if(localStorage.getItem("authorid")=="")
    console.log(this.addBlogForm.value)
    //alert(" login");

    const url = "http://localhost:3000/course/postcontent/"
    this.myservice.addBlog(url + localStorage.getItem("authorid") , this.addBlogForm.value).subscribe(data => {
      console.log(data);
      // if(data['code']=='11000'){
      //   this._snackBar.open("Please use Some Other Author Name", 'close', {
      //     //duration: 2000,
      //   });
      //    //this.router.navigate(['/training']);
      //  }
      this.router.navigate(['/author']);
      this.addBlogForm.reset();
    },
      error => {
        console.log(error.message);
      }
    )
  }
  // selectedFileforimaage(event){
  //   this.images = event.target.files[0];
  //   console.log(this.images)
  // }
  
  signup() {

    this.router.navigate(['/blogauthorsignup']);
  }
}
