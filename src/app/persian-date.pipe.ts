import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'persianDate',
})
export class PersianDatePipe implements PipeTransform {
  transform(
    value: Date | string | { seconds: number; nanoseconds: number }
  ): string {
    if (!value) {
      return '';
    }

    let date: Date;

    // If it's a Firestore Timestamp object
    if (
      typeof value === 'object' &&
      'seconds' in value &&
      'nanoseconds' in value
    ) {
      // Convert to milliseconds
      const milliseconds = value.seconds * 1000 + value.nanoseconds / 1_000_000;
      date = new Date(milliseconds);
    }
    // If it's already a Date
    else if (value instanceof Date) {
      date = value;
    }
    // If it's a string
    else {
      date = new Date(value);
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    // Convert to Persian date
    const persianDate = moment(date).locale('fa').format('YYYY/MM/DD');
    return persianDate;
  }
}
