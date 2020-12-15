import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-loginlogout',
  templateUrl: './loginlogout.component.html',
  styleUrls: ['./loginlogout.component.css']
})
export class LoginlogoutComponent implements OnInit {
  
  hide = true;
  loginForm: FormGroup;
  countryList: Array<any> = [
    { name: 'Germany', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'] },
    { name: 'Spain', cities: ['Barcelona','a','b'] },
    { name: 'USA', cities: ['Downers','Grove'] },
    { name: 'Mexico', cities: ['Puebla'] },
    { name: 'China', cities: ['Beijing'] },
  ];
  cities: Array<any>;
  arraydata: any;
  changeCountry(count) {
    console.log(count.value.name)
    //if use find below single find wala line enough to show city
    this.cities = this.countryList.find(con => con.name == count.value.name).cities;


console.log(this.cities)

//if use filter then below 5 line of code is useful to display city

    // this.cities=this.countryList.filter(data=>data.name==count);
    //  this.cities.forEach(element => {
    //    console.log(element.cities);
    //    //arraydata will be aray of city
    //    this.arraydata=element.cities;
  }
  constructor(@Inject(DOCUMENT) public document: Document,private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog,private router: Router,public auth: AuthService) { }

  loginWithRedirect(): void {
    // Call this to redirect the user to the login page
    this.auth.loginWithRedirect();
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }
  login(){

console.log(this.loginForm.value)
    //alert(" login");
    const url="http://localhost:3000/login"
    this.myservice.login(url,this.loginForm.value).subscribe(data=>{
console.log(data)
      console.log(data[0].message);
      // if(data[0].message=="Auth successful"){

      //   this.router.navigate(['/training']);
      // }
      localStorage.setItem('token',data[0].token);
      this.router.navigate(['/training']);
     // this.loginForm.reset();
    })
  }

  signup(){

    this.router.navigate(['/signup']);
  }

}
