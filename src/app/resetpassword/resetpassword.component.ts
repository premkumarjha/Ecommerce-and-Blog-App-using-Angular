import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  resetForm: FormGroup;
  constructor(private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      // name:['',Validators.required],
      email: ['', Validators.email],
      // password: ['', Validators.required],
    });
  }

  reset(){
    const url="http://localhost:3000/forgotpassword/reset";

    this.myservice.resetEmail(url,this.resetForm.value).subscribe(data=>{
      console.log(data[0].resetToken);
      localStorage.setItem('token',data[0].resetToken);
    })
    alert("please check your mail, a link has been sent");
    //this.router.navigate(['/login']);
  }
  
}
