import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingFormat'
})
export class RatingFormat implements PipeTransform {

  transform(value: number): any {
    
    if ( value === null || value === undefined) return '';

    return value.toFixed(1);

  }

}
