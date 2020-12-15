import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showFiller = false;
  selectedData;
  foods: any[] = [
    {value: 'steak-0', viewValue: ['a','b,','c']},
    {value: 'pizza-1', viewValue: ['a','b,','c']},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];


  
  constructor() { }

  ngOnInit(): void {
  }
  selectedItem(item){

    console.log(item.value.value)
    console.log(this.selectedData)
  }
}
