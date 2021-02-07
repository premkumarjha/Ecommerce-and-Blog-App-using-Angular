import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
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
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-loginlogout',
  templateUrl: './loginlogout.component.html',
  styleUrls: ['./loginlogout.component.css']
})


export class LoginlogoutComponent implements OnInit {

  errorMessage:Boolean=false;

  isPresssed: Boolean;

  // @ViewChild("myCanvasCircle", { static: false }) myCanvasCircle: ElementRef;
  // @ViewChild("color", { static: false }) color: ElementRef;


  // @HostListener('mouseup') onMouseUp() {

  // //alert("hellow prem");
  // this.isPresssed=false

  // }
  // @HostListener('mousedown') onMouseDown() {

  //   //alert("hellow prem");
  //   this.isPresssed=true

  //   }
 
  drawingcolor;
  hide = true;
  loginForm: FormGroup;
  countryList: Array<any> = [
    { name: 'Germany', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'] },
    { name: 'Spain', cities: ['Barcelona', 'a', 'b'] },
    { name: 'USA', cities: ['Downers', 'Grove'] },
    { name: 'Mexico', cities: ['Puebla'] },
  ];

  cities: Array<any>;
  arraydata: any;
  changeCountry(count) {
    console.log(count.value.name);
   
    
    //if use find below single find wala line enough to show city
    //this.cities = this.countryList.find(con => con.name == count.value.name).cities;
this.cities=this.countryList.find(data=>data.name == count.value.name).cities;
    


    //if use filter then below 5 line of code is useful to display city

    // this.cities=this.countryList.filter(data=>data.name==count);
    //  this.cities.forEach(element => {
    //    console.log(element.cities);
    //    //arraydata will be aray of city
    //    this.arraydata=element.cities;
  }
  constructor(@Inject(DOCUMENT) public document: Document,private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog, private router: Router, public auth: AuthService,private _snackBar: MatSnackBar) { 


    
  }
  


  loginWithRedirect(): void {
    // Call this to redirect the user to the login page
    this.auth.loginWithRedirect();
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    //let canvasval = this.myCanvasCircle.nativeElement;
    //this.pRef.nativeElement.innerHTML = "DOM updated successfully!!!";
    //console.log(canvasval);
    //this.drawcircle(200,200);
  }
  get f() { return this.loginForm.controls; }

  login() {

    console.log(this.loginForm.value)
    //alert(" login");
    const url = "http://localhost:3000/login"
    this.myservice.login(url, this.loginForm.value).subscribe(data => {
      console.log(data)
     console.log(data['message']);
       if(data['message']=="user not found"){
        this._snackBar.open(data['message'], 'close', {
          //duration: 2000,
        });
         //this.router.navigate(['/training']);
       }
      localStorage.setItem('token', data[0].token);
      this.router.navigate(['/training']);
      // this.loginForm.reset();
    },
    error=>{

this._snackBar.open(error.message, 'close', {
  //duration: 2000,
});
      console.log(error.message);
    }
    
    
    
    )
  }

  signup() {

    this.router.navigate(['/signup']);
  }

  //below code was for draWING APP

  //   drawcircle(x,y) {
  //     if(this.isPresssed){
  //     let canvasval = this.myCanvasCircle.nativeElement;
  //     var cctx = canvasval.getContext("2d");
  //     cctx.beginPath();
  //     cctx.arc(x, y, 5, 0, 2 * Math.PI);
  //     cctx.fillStyle =this.drawingcolor;
  //     cctx.fill();
  //    // cctx.stroke();
  //   }
  // }
  // mouselog(event) {
  //   console.log(event.screenX);
  //   this.drawcircle(event.clientX,event.clientY)
  // }
  // selectcolor(event){
  //   console.log(event.target.value);
  //   this.drawingcolor=event.target.value;
  // }

}
