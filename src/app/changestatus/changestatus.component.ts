import { Component, OnInit, Output, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-changestatus',
  templateUrl: './changestatus.component.html',
  styleUrls: ['./changestatus.component.css']
})
export class ChangestatusComponent implements OnInit {

output:any;
  educatorForm: FormGroup;
  statusValue: any;
  values:any;
  finalStatus: any;

  
  constructor( private fb: FormBuilder,private myservice: MyserviceService,public dialog: MatDialog) { 

    this.myservice.getNavChangeEmitter().subscribe(data=>{
      this.statusValue=data;
      
  //console.log(data);
// console.log(url)

//this.updateData(this.statusValue,this.values);

// this.dialog.closeAll();
 //console.log(this.statusValue)
    })
    
  }

  ngOnInit(): void {
//this.getData();
  }
  approve(value){
    const url="http://localhost:3000/educator/";
   // console.log(value)
   this.values=value;
   console.log(this.values);
   const formdata= new FormData();
   formdata.append('data',this.values);
   this.finalStatus=this.statusValue;
   console.log(url + this.finalStatus)
   
   this.myservice.putEducator(url + this.finalStatus,this.values).subscribe(result1=>{
     console.log("ram")
    console.log(result1);
    this.output=result1;
    this.dialog.closeAll();
    //return result;
    
  })
//this.updateData(this.finalStatus,this.values)
  }

//   updateData(statusValue,value){
//     console.log(statusValue)
//     console.log(value)
//     const url="http://localhost:3000/educator/";
// this.myservice.putEducator(url + statusValue,value).subscribe(result=>{
//   console.log(result);
//   this.output=result;
  
//   //return result;
  
// })
//   }
  reject(value){

   console.log(value)
   this.myservice.emitNavChangeEvent(value);
  }
// getData(){
//   const url="http://localhost:3000/educatordata"
//   this.myservice.getEducator(url).subscribe(data=>{
//      this.output=data;
//      console.log(this.output);

//   })
//   return this.output ;
// }

}
