import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AddtrainingeventComponent } from '../addtrainingevent/addtrainingevent.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();
  //result: Object;
  tableData: any = [];
  result: any;

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private fb: FormBuilder,private myservice: MyserviceService,public dialog: MatDialog) {}
  
   openDialog() {
    const dialogRef=this.dialog.open(AddtrainingeventComponent,{ disableClose: true });
  }

 
  ngOnInit(): void {
    
  }
}
