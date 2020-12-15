import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { MyserviceService } from "../myservice.service"
import { throwError } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { getLocaleDateFormat } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  selector: 'app-edittrainingcourse',
  templateUrl: './edittrainingcourse.component.html',
  styleUrls: ['./edittrainingcourse.component.css'],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EdittrainingcourseComponent implements OnInit {

  products: any;

  addnewtrainingform: FormGroup;

  trainingcenters = ['USA-AL', 'USA-AZ', 'USA-FA', 'USA-FL', 'USA-KA', 'USA-LA', 'USA-MN', 'USA-MS']
  //data:any;
  result: any;
  _id: any;
  // array: any = { id: "", data: "" }
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog) {

    this.myservice.getAddCourseData().subscribe(res => {
      this.result = res;
      console.log(this.result._id)
      this._id = this.result._id;
    })
  }

  ngOnInit(): void {
    //this.onSave();

    this.getData();
    this.addnewtrainingform = this.fb.group({
      trainingeventname: ['', Validators.required],
      trainingcenter: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      datepicker3: ['', Validators.required],
      datepicker4: ['', Validators.required],

    });
    console.log(this.result.trainingeventname)
    this.addnewtrainingform.controls.trainingeventname.setValue(this.result.trainingeventname);
    this.addnewtrainingform.controls.trainingcenter.setValue(this.result.trainingcenter)
    this.addnewtrainingform.controls.startdate.setValue(this.result.startdate)
    this.addnewtrainingform.controls.enddate.setValue(this.result.enddate)
    this.addnewtrainingform.controls.datepicker3.setValue(this.result.datepicker3)
    this.addnewtrainingform.controls.datepicker4.setValue(this.result.datepicker4);

  }
  updateData() {
    const url = "http://localhost:3000/update/";
    console.log(url + this._id);
    this.myservice.editData(url + this._id, this.addnewtrainingform.value).subscribe(data => {
      this.products = data;
      // this.myservice.emitNavChangeEvent(data)-->ye ak extra add kar raha hai;
      console.log(this.products);
      this.dialog.closeAll();
      alert('your data has been edited dsuccessfully');
      //below code is just to send lates fetched data and send to  event...
      this.getData()
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
      console.log(this.result);
    })

    return this.result;
  }
}
