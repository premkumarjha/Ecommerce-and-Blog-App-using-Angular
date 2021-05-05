import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { MyserviceService } from "../myservice.service"
import { throwError } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { getLocaleDateFormat } from '@angular/common';

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
  selector: 'app-deletetrainingcourse',
  templateUrl: './deletetrainingcourse.component.html',
  styleUrls: ['./deletetrainingcourse.component.css'],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})
export class DeletetrainingcourseComponent implements OnInit {

  products: any;
  result: any;
  _id: any;
  array: any = { id: "", data: "" }
  addnewtrainingform: FormGroup;

  trainingcenters = ['hdh', 'hgrthtrht-AZ', 'ertytr', 'ertsyty', 'ryryt', 'rtyuyt', 'tyuuy', 'ryuy']


  constructor(private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog) {
    this.myservice.getAddCourseData().subscribe(res => {
      this.result = res;
      this._id = this.result._id;
      this.array.id = this.result._id;
      console.log(this.array)
    })
  }

  ngOnInit(): void {
    this.getData();
    this.addnewtrainingform = this.fb.group({
      trainingeventname: ['', Validators.required],
      trainingcenter: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      datepicker3: ['', Validators.required],
      datepicker4: ['', Validators.required],

    });
    this.addnewtrainingform.controls.trainingeventname.setValue(this.result.trainingeventname);
    this.addnewtrainingform.controls.trainingcenter.setValue(this.result.trainingcenter)
    this.addnewtrainingform.controls.startdate.setValue(this.result.startdate)
    this.addnewtrainingform.controls.enddate.setValue(this.result.enddate)
    this.addnewtrainingform.controls.datepicker3.setValue(this.result.datepicker3)
    this.addnewtrainingform.controls.datepicker4.setValue(this.result.datepicker4);
  }
  onDelete() {
    const url = "http://localhost:3000/delete/";
    this.myservice.deletedata(url + this._id,).subscribe(data => {
      console.log(url + this._id)
      this.products = data;
      //this.myservice.emitNavChangeEvent(data);
      console.log(this.products);
      this.dialog.closeAll();
      //this.myservice.emitNavChangeEvent(data);
      alert('your data has been deleted successfully');
      this.getData();
    },
      error => {
        alert("some erros are present");
        return throwError(error);
      })
  }

  getData() {
    const url = "http://localhost:3000/"
    this.myservice.getData(url).subscribe(res => {
      this.result = res;
      this.myservice.emitNavChangeEvent(this.result);
      console.log(this.result)
    })

    return this.result;
  }

}
