import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'square'
})
export class SquarePipe implements PipeTransform {

  transform(firstName: string,...lastName:string[]): string   {
    return firstName +" "+ lastName.join(" ");
  }

}
