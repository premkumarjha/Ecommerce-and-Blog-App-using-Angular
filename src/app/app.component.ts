import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from './myservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'myapp';

//   constructor(public myservice: MyserviceService,private router: Router){

// if(this.myservice.items.length===0){
// this.router.navigateByUrl('/productlist')
// }

 // }
}
