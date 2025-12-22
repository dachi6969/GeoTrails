import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingStars'
})
export class RatingStarsPipe implements PipeTransform {

  transform(value: number): any {
    
    if ( value === null || value === undefined) return '';

    if ( value - Math.floor(value) === 0 ) {
      return '★'.repeat(value) + '☆'.repeat(5 - value); // only in case of full stars
    };
    
    if ( value - Math.floor(value) > 0 ) {
      return '★'.repeat(Math.floor(value)) + '☆'.repeat(5 - Math.floor(value));
    }

  }

}
