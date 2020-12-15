import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger, animation } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangestatusComponent } from '../changestatus/changestatus.component';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
@Component({
  selector: 'app-educator',
  templateUrl: './educator.component.html',
  styleUrls: ['./educator.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
 
})
export class EducatorComponent implements OnInit {
  tableColumn:String[]=['trainingevent']
  displayedColumns: string[] = [ 'firstname', 'lastname', 'email', 'dob','status'];
  expandeddataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource=new MatTableDataSource<any>(Data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  expandedElement = [];
  output: any;
  id:any;
  public statusValue:any="";
  
  constructor(private fb: FormBuilder, private myservice: MyserviceService, public dialog: MatDialog) { }
//Data;
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getData();
      
  }
  changeApprovedStatus(element){
    //const data = value;
    const dialogRef = this.dialog.open(ChangestatusComponent,{
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(data=>{
       this.getData();
     })
    console.log(element)
    console.log(element._id)
    this.id=element._id;
    console.log(this.id)
    this.myservice.emitNavChangeEvent(this.id);
    
    

}

// changeRejectedStatus(element){
//   //const data = value;
//   const dialogRef = this.dialog.open(ChangestatusComponent,{
//     disableClose: true,
//   });
//   console.log(element._id);

// }

getData(){
  const url="http://localhost:3000/educatordata"
  this.myservice.getEducator(url).subscribe(data=>{
     this.output=data;
     console.log(data)
     console.log(this.output);
     this.expandeddataSource=new MatTableDataSource<any>(this.output);
  })
  return this.output ;
}

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status:string;
}
const Data:any[]=[
  {trainingevent:"ACT Certified Educator Training-Kansas City"},
{trainingevent:"new test 1522"},
{trainingevent:"Delivery deletion test event(B2C)"},
{trainingevent:"BAtest"},
{trainingevent:"ACE Online Courses August"},
{trainingevent:"Date02 July B2C Event"},
{trainingevent:"Date28 July B2C Event"},

{trainingevent:"AUGTes"},
{trainingevent:"ACE SCIENCE QT - Invitation Only - Group Code Required"},
{trainingevent:"FruiTest"},
{trainingevent:"Date02 July B2C Event"},
{trainingevent:"Date28 July B2C Event"},

];

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',status:'APPROVED'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',status:'APPROVED'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',status:'REJECTED'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',status:'APPROVED'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',status:'APPROVED'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',status:'REJECTED'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',status:'APPROVED'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',status:'APPROVED'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',status:'APPROVED'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',status:'APPROVED'},
  
];

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  
