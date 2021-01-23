import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPractice]'
})
export class PracticeDirective {
  isPresssed: boolean;

  constructor() { }

  @HostListener('mouseover') onMouseUp() {
    
  alert("hellow prem");
  //this.isPresssed=false
   
  }
  @HostListener('mousedown') onMouseDown() {
    
    //alert("hellow prem");
    this.isPresssed=true
     
    }


}
