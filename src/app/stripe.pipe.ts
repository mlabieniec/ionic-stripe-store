import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripe'
})
export class StripePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    let result = value.toString().slice(0,(value.toString().length - 2));
    return result;
  }

}
