import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'custom'
})
export class customPipe extends  DatePipe implements PipeTransform  {

  // transform(firstName: string,...lastName:string[]): string   {
  //   return firstName +" "+ lastName.join(" ");
  // }
  transform(value: any, args?: any): any {
    return super.transform(value, "EEEE d MMMM y h:mm a");
  }
}
