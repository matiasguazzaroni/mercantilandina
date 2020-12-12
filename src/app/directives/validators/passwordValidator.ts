import { ValidatorFn, AbstractControl } from '@angular/forms'

export function passwordValidator(score: Number, minScore: Number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        return (score >= minScore) ? null : {notAllowedPassword: {value: score}};
    };
}