import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  signup(){

console.log(this.signupForm.value)
    //alert(" login");
    const url="http://localhost:3000/signup"
    this.myservice.userSignup(url,this.signupForm.value).subscribe(data=>{
console.log(data)
      //console.log(data[0].message);
      // if(data[0].message=="Auth successful"){

      //   this.router.navigate(['/training']);
      // }
      //localStorage.setItem('token',data[0].token);
      this.router.navigate(['/training']);
     // this.loginForm.reset();
    })
  }

  


}
