import { ValidatorFn, AbstractControl } from '@angular/forms'

export function notExistsValidator(exists: boolean): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        return (!exists) ? null : {notAllowed: {value: control.value}};
  }
}