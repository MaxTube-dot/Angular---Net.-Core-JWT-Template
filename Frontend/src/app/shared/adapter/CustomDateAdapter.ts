import { NativeDateAdapter } from "@angular/material/core";
import * as _moment from 'moment';
const moment = _moment;

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date): string {
    return moment(date).format('DD.MM.YYYY')}

  override parse(value: any): Date | null {
    if (!moment(value, 'DD.MM.YYYY', true).isValid()) {
      return this.invalid();
    }
    return moment(value, 'DD.MM.YYYY', true).toDate();
  }

  override getFirstDayOfWeek(): number {
    return 1;
  }
}
