import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passportlogin',
  templateUrl: './passportlogin.component.html',
  styleUrls: ['./passportlogin.component.css']
})
export class PassportloginComponent implements OnInit {


  loginForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private myservice: MyserviceService,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }
  passportLogin(){

    console.log(this.loginForm.value)
        //alert(" login");
        const url="http://localhost:3000/passportlogin/login"
        this.myservice.passportLogin(url,this.loginForm.value).subscribe(data=>{
      console.log(data)

        })
  }

  passportRegister(){
    const url="http://localhost:3000/passportlogin/register"
    this.myservice.passportRegister(url,this.loginForm.value).subscribe(data=>{
  console.log(data)

    })

  }
}
