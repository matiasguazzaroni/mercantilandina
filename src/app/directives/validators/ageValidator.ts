import { ValidatorFn, AbstractControl } from '@angular/forms'

export function ageValidator(firstAge: Number, secondAge?: Number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
    
    function _calculateAge(birthday) { 
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    if (control.value) {
        const age = _calculateAge(control.value.toDate());
        let returnValue;
        if (secondAge) {
            (age >= firstAge && age <= secondAge) ? returnValue = null : returnValue = {
                notAllowedAge: {
                                value: control.value, 
                                requiredMinAge: firstAge, 
                                requiredMaxAge: secondAge
                            }
                };
        } else {
            (age >= firstAge) ? returnValue = null : returnValue = {
                notAllowedAge: {
                                value: control.value, 
                                requiredMinAge: firstAge
                               }
                };
        }
        return returnValue;
    }
  }
}