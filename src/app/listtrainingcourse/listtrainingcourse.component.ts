import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyserviceService } from "../myservice.service"
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddtrainingcourseComponent } from '../addtrainingcourse/addtrainingcourse.component';
import { EdittrainingcourseComponent } from '../edittrainingcourse/edittrainingcourse.component';
import { DeletetrainingcourseComponent } from '../deletetrainingcourse/deletetrainingcourse.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



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
  selector: 'app-listtrainingcourse',
  templateUrl: './listtrainingcourse.component.html',
  styleUrls: ['./listtrainingcourse.component.css'],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ListtrainingcourseComponent implements OnInit {

  
  displayedColumns: string[] = ['subject', 'trainer', 'startdate', 'enddate', 'status', 'actions'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  tableData: any = [];
  result: any;
  trainingeventname:any;
  trainingcentername:any;
  constructor(private myservice: MyserviceService, public dialog: MatDialog,) {

    this.myservice.getNavChangeEmitter().subscribe(data=>{
      this.trainingeventname=data.trainingeventname;
      this.trainingcentername=data.trainingcenter;
      console.log(this.trainingcentername)
      })
      this.getData();
   }

  ngOnInit(): void {




  }
getData() {
    const url = "http://localhost:3000/course/getsubject"
    this.myservice.getSubjectData(url).subscribe(res => {
      this.result = res;
      //this.tableData.push(res);
      this.tableData = res;

      console.log(this.tableData)
      this.dataSource = new MatTableDataSource<any>(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //sending data bu using service concept
      //this.myservice.sendMessage(this.result);
    })
    return this.result;
  }










}
