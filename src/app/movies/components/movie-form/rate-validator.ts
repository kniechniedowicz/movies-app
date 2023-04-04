import { AbstractControl } from '@angular/forms';

export const rateValidator = (control: AbstractControl) => {
  const rate = control.value;

  if (rate < 0 || rate > 10) {
    return { invalidRate: 'Rate should be in range between 0 and 10' };
  }

  return null;
};
