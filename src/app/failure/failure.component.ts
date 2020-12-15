import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class FailureComponent implements OnInit {

  constructor(private myservice: MyserviceService,) { }

  ngOnInit(): void {
  }
  generateToken() {
    const url = "http://localhost:3000/forgotpassword/token"
    let data = {
      a: 7
    };

    let output: any = { token: "" };
    this.myservice.generateToken(url, data).subscribe(result => {

      //result.token //me token pe red error de raha tha;

      output = result;
      console.log(output);

      let tokenvalue = output.token;


      localStorage.setItem('token', tokenvalue);

    }

    )
  }

  sendToken() {

    const url = "http://localhost:3000/forgotpassword/sendtoken"
    let data = {
      a: 8
    }

    console.log(localStorage.getItem('token'))
    this.myservice.sendToken(url, data).subscribe(result => {

      console.log(result)

    }

    )
  }
}
