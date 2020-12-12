import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsfunctionsService {

  constructor() { }
  
  public clearControl(control: AbstractControl): void {
    control.disable();
    control.setValue('');
    control.setErrors(null);
  }

  public enableControl(control: AbstractControl): void {
    control.enable();
    control.setErrors(null);
  }

  public filterArray(arrayToFilter: Array<any>, stringToFind: string, property?: any): Array<any> {
    if (property) {
      return arrayToFilter.filter( (elem: any) => {
        if (elem[property].toLowerCase().indexOf(stringToFind.toLowerCase()) != -1) 
          return true;
        return false;
      })
    } else {
      return arrayToFilter.filter( (elem: string) => {
        if (elem.toLowerCase().indexOf(stringToFind.toLowerCase()) != -1) 
          return true;
        return false;
      })
    }
  }

}
