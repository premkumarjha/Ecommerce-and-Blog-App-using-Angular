import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private fb: FormBuilder,private myservice: MyserviceService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
