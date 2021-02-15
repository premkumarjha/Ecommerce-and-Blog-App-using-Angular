import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import{MyserviceService} from "../myservice.service"
import { throwError } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { getLocaleDateFormat } from '@angular/common';
import * as XLSX from 'xlsx'; 

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-addtrainingevent',
  templateUrl: './addtrainingevent.component.html',
  styleUrls: ['./addtrainingevent.component.css'],
  providers: [
  
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class AddtrainingeventComponent implements OnInit {

  products:any;

  addnewtrainingform: FormGroup;
  
  trainingcenters=['A','B','C','D','E','F','G','H']
  tableData: any = [];
  result: any;

  constructor( private fb: FormBuilder,private myservice: MyserviceService,public dialog: MatDialog) { 
     
  }

  ngOnInit(): void {
    //this.onSave();
    this.addnewtrainingform = this.fb.group({
      trainingeventname: ['', Validators.required],
      trainingcenter: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      datepicker3: ['', Validators.required],
      datepicker4: ['', Validators.required],

    });
    //this.getData();
    //console.log(abc)
  }
  onSave() {
    const url="http://localhost:3000/add";
    
this.myservice.postdata(url,this.addnewtrainingform.value).subscribe(data=>{
  //console.log(data);
  this.products=data;
  console.log(data)
    //console.log(this.addnewtrainingform.value);
  
console.log("Hiii")
//console.log(this.products);
  this.dialog.closeAll();
 // this.myservice.emitNavChangeEvent(data);
  alert('your data has been successfully added');
  //getLocaleDateFormat(
    this.getData()
},
error => {
  alert("some erros are present");
  return throwError(error);
})
  }

  getData(){

const url="http://localhost:3000/"
this.myservice.getData(url).subscribe(res=>{
   this.result=res;
  //this.myservice.sendMessage(this.result);
  this.myservice.emitNavChangeEvent(this.result);
  console.log(res)
  return this.result;

})

  }

  
}
