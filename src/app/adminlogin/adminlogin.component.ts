import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

isAdmin:any
  hide = true;
  adminLogin: FormGroup;
  
  constructor(private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {

    this.adminLogin = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  login(){

    console.log(this.adminLogin.value)
        //alert(" login");
        const url="http://localhost:3000/adminlogin"
        this.myservice.adminLogin(url,this.adminLogin.value).subscribe(data=>{
    console.log(data)
          console.log(data[0].message);
          //this.router.navigate(['/upload']);
          
          localStorage.setItem('token',data[0].token);
    console.log(data[0].user[0].role)
    if(data[0].user[0].role=="ADMIN"){
      this.myservice.sendRole(true);
      this.myservice.sendAdminRole(data[0].user[0].role);
      this.router.navigate(['/upload']);

    }else{
      this.router.navigate(['/admin']);
      alert("invalid email or password")
    }
         // this.loginForm.reset();
        })
      }
    
      signup(){
    
        alert("signup")
      }
    
}
