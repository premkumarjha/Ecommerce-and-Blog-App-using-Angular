import { Component, OnInit, ViewChild, Input, OnChanges, Inject, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyserviceService } from "../myservice.service"
import { Subscription } from 'rxjs';
import { ListtrainingcourseComponent } from '../listtrainingcourse/listtrainingcourse.component';
import { MatDialog } from '@angular/material/dialog';
import { AddtrainingcourseComponent } from '../addtrainingcourse/addtrainingcourse.component';
import { EdittrainingcourseComponent } from '../edittrainingcourse/edittrainingcourse.component';
import { DeletetrainingcourseComponent } from '../deletetrainingcourse/deletetrainingcourse.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class TrainingComponent implements OnInit {

  pageEvent: any
  //@Input() result: any[];

  //subscription: Subscription;
  //messagefromSibling:any= [];
  //result="ram";
  
  displayedColumns: string[] = ['trainingeventname', 'trainingcenter', 'startdate', 'enddate', 'groupcode', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef; 


  tableData: any = [];
  result: any;

  constructor(private myservice: MyserviceService, public dialog: MatDialog,) {}


  // ngOnChanges() {
  //   this.getData();
  // }
  ngOnInit(): void {

    //subscribing the event data
    this.myservice.getNavChangeEmitter().subscribe(res => {
      this.tableData = res;
      console.log(this.tableData);
      console.log(res)
      this.dataSource = new MatTableDataSource<any>(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

    this.getData();
  }

  ExportTOExcel(data) {  
    
    
      var wb = XLSX.utils.book_new();
      //it will export all data..
      var ws = XLSX.utils.json_to_sheet(this.tableData);
      XLSX.utils.book_append_sheet(wb, ws, "sheetName");
      XLSX.writeFile(wb,  'ScoreSheet.xlsx');
   
    
    
    }
                    //to export data from data table as per paginator that is displaying in data table in ui
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.datasource);  
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    // XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
    
  
  // ngAfterViewInit(){
  //   this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  // }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onPageChanged(a:any){
// const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.dataSource);  
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();  
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
//     XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
    //alert(JSON.stringify(a))
    //this.pageEvent=JSON.stringify(a);
    console.log(JSON.stringify(a))
  }

  getData() {
    const url = "http://localhost:3000/"
    this.myservice.getData(url).subscribe(res => {
      this.result = res;
      //this.tableData.push(res);
      this.tableData = res;

      console.log(this.tableData);
      //console.log(this.result)
      this.dataSource = new MatTableDataSource<any>(this.tableData);
      console.log(this.dataSource)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //sending data bu using service concept
      //this.myservice.sendMessage(this.result);
    })

    //return this.result;
  }

  openListTrainingDialog(value) {
    const dialogRef = this.dialog.open(ListtrainingcourseComponent, { disableClose: true});
console.log(value.trainingeventname);
this.getData();
this.myservice.emitNavChangeEvent(value);
dialogRef.afterClosed().subscribe(data=>{
 // this.getData();
})
  }
  addCourseDialog(value) {
    const data = value;
    const dialogRef = this.dialog.open(AddtrainingcourseComponent, {
      disableClose: true,
    });
    console.log(value.trainingcenter)
    this.myservice.sendAddCourseData(value.trainingcenter);
  }
  editCourseDialog(value) {
    const dialogRef = this.dialog.open(EdittrainingcourseComponent, { disableClose: true });
    this.myservice.sendAddCourseData(value);
    console.log(value)
    //   this.myservice.sendAddCourseData(res);
    // })
    dialogRef.afterClosed().subscribe(result1 => {
      //to update without refresh we can also uncomment below ,but we doing this by event,
      //this.getData();

    })
  }
  deleteCourseDialog(value) {
    const dialogRef = this.dialog.open(DeletetrainingcourseComponent, { disableClose: true });
    this.myservice.sendAddCourseData(value);
    dialogRef.afterClosed().subscribe(result1 => {
      //by calling this we can update table at same time with latest data;,but i have done this by event;
      // this.getData();

    })
  }

}

// export interface PeriodicElement {
//   trainingeventname: string;
//   trainingcenter: string;
//   startdate: string;
//   enddate: string;
//   groupcode: string;
//   actions: string;
// }

// let ELEMENT_DATA: PeriodicElement[] = [

//   { trainingeventname: 'aghvh', trainingcenter: 'kj', startdate: 'Aug 6,2020', enddate: 'Aug 7,2020', groupcode: 'qecf', actions: '' },
//   { trainingeventname: 'hjjy', trainingcenter: 'kafj', startdate: 'july 6,2020', enddate: 'july 7,2020', groupcode: 'qertgtrcf', actions: '' },
//   { trainingeventname: 'agh jnvh', trainingcenter: 'krgj', startdate: 'june 6,2020', enddate: 'june 7,2020', groupcode: 'yuin', actions: '' },
//   { trainingeventname: 'uimu,', trainingcenter: 'iol', startdate: 'march 6,2020', enddate: 'march 7,2020', groupcode: 'qwdwef', actions: '' },
//   { trainingeventname: ' tnuyj', trainingcenter: 'er', startdate: 'april 6,2020', enddate: 'april 7,2020', groupcode: 'vthbt', actions: '' },
//   { trainingeventname: 'muikfb', trainingcenter: 'yu', startdate: 'jan 6,2019', enddate: 'Aug 7,2020', groupcode: 'qectytuf', actions: '' },
//   { trainingeventname: 'weretg', trainingcenter: 'tnu', startdate: 'Aug 6,2019', enddate: 'Aug 7,2020', groupcode: 'nukn', actions: '' },
//   { trainingeventname: 'yjnu', trainingcenter: 'il', startdate: 'Aug 6,2017', enddate: 'june 8,2020', groupcode: 'rtyn', actions: '' },
//   { trainingeventname: 'ghj', trainingcenter: 'tu', startdate: 'Aug 7,2016', enddate: 'may 7,2020', groupcode: 'yumuk', actions: '' },
//   { trainingeventname: 'wer', trainingcenter: 'rtyhn', startdate: 'Aug 6,2020', enddate: 'Aug 7,2020', groupcode: 'rtbjyn', actions: '' },
//   //{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//  ]
//var newData = [...ELEMENT_DATA, this.productOutput];
//console.log(newData.length);

