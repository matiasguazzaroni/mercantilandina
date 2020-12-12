import { ValidatorFn, AbstractControl } from '@angular/forms'

export function regexValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return nameRe.test(control.value) ? null : {notAllowedValue: {value: control.value}};
  };
}