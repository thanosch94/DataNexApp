import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: any, locale: string = 'en-US'): string {
    // Check if the value is a valid number
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }

    // Format the number using toLocaleString (Greek locale by default)
    return value.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

}
