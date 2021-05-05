import { Component, OnInit } from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';



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
  selector: 'app-addtrainingcourse',
  templateUrl: './addtrainingcourse.component.html',
  styleUrls: ['./addtrainingcourse.component.css'],
  providers: [
  
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddtrainingcourseComponent implements OnInit {

  subjectList=[' Basics',' English',' Reading',' Writing',' Maths',' Science',' Basics -',' Basics'];

  trainingcenters=['fhfxj','hhth','etryut','uoii,om','awrwate','wertr','wetyw','tuuiiyr'];
  products:any;
  addNewCourseform: FormGroup;
    data:any;
  constructor(private fb: FormBuilder,private myservice: MyserviceService,public dialog: MatDialog) {

    this.myservice.getAddCourseData().subscribe(res=>{
      this.data=res;
      console.log(this.data)
    })
   }

  ngOnInit(): void {

    this.addNewCourseform = this.fb.group({
      subject: ['', Validators.required],
      trainer: ['', Validators.required],
      trainingcenter: [''],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      //datepicker4: ['', Validators.required],

    });
    console.log(this.addNewCourseform.value)
  }

  onSaveAddCourse(){
    const url="http://localhost:3000/course/addsubject";
    console.log(this.addNewCourseform.value)
    this.myservice.postSubjectData(url,this.addNewCourseform.value).subscribe(data=>{
      this.products=data;
      console.log(data); 
    console.log("Hiii");
    //console.log(this.products);
      this.dialog.closeAll();
     // this.myservice.emitNavChangeEvent(data);
      alert('your data has been successfully added');
      //getLocaleDateFormat(
        //this.getData()
    },
    error => {
      alert("some erros are present");
      return throwError(error);
    })
      }
  
}

