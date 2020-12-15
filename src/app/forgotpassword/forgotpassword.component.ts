import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  updateForm: FormGroup;
  constructor(private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      // name:['',Validators.required],
      //email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  update() {
    console.log(this.updateForm.value)

    let data = {

      formvalue: this.updateForm.value.password,
      token: localStorage.getItem('token')
    }
    console.log(data)
    // const formData = new FormData();
    // formData.append("data",this.updateForm.value);
    // formData.append("token",localStorage.getItem('token'));
    // console.log(formData)

    const url = "http://localhost:3000/forgotpassword/updatepassword";

    this.myservice.updatePassword(url, data).subscribe(data => {
      this.router.navigate(['/login']);
      console.log(data);
    })
    alert("your password has been updated")
  }
}
