import { Pipe, PipeTransform } from '@angular/core';

const MAX_RATE = 10;

@Pipe({
  name: 'rate',
})
export class RatePipe implements PipeTransform {
  transform(value: string): string {
    return `${value}/${MAX_RATE}`;
  }
}
