import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'objectivity-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearSelectorComponent),
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: YEAR_MODE_FORMATS,
    },
  ],
})
export class YearSelectorComponent implements ControlValueAccessor {
  maxDate = moment(new Date());
  value: moment.Moment;
  disabled = false;
  control = new FormControl<moment.Moment | null>(null, {
    validators: [Validators.required, Validators.max(new Date().getFullYear())],
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_value: moment.Moment): void => undefined;
  onTouched = (): void => undefined;

  writeValue(value: number): void {
    if (value && this.validateYear(value)) {
      const momentDate = moment().set({ year: value });

      if (momentDate.isValid()) {
        momentDate.set({ date: 1 });
        this.onChange(momentDate);
        this.control.setValue(momentDate, { emitEvent: true });
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onYearSelected(
    chosenDate: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    datepicker.close();

    if (!this.validateYear(chosenDate.year())) {
      return;
    }

    chosenDate.set({ date: 1 });
    this.onChange(chosenDate);
    this.control.setValue(chosenDate, { emitEvent: true });
  }

  validateYear(year: number): boolean {
    if (
      year === undefined ||
      year === null ||
      year > new Date().getFullYear()
    ) {
      return false;
    }

    return true;
  }

  openDatepicker(datepicker: MatDatepicker<moment.Moment>) {
    if (!datepicker.opened) {
      datepicker.open();
    }
  }
}
