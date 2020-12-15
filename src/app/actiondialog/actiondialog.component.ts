import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListtrainingcourseComponent } from '../listtrainingcourse/listtrainingcourse.component';

@Component({
  selector: 'app-actiondialog',
  templateUrl: './actiondialog.component.html',
  styleUrls: ['./actiondialog.component.css']
})
export class ActiondialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { 

 
  }
  // openDialog() {
  //   this.dialog.open(ListtrainingcourseComponent);
  // }
  ngOnInit(): void {
  }

}
