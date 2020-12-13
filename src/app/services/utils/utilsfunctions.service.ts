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
      }).sort( (a: any, b: any) => {
        if (a[property] > b[property]) return 1;
        if (a[property] < b[property]) return -1;
        return 0;
      })
    } else {
      return arrayToFilter.filter( (elem: string) => {
        if (elem.toLowerCase().indexOf(stringToFind.toLowerCase()) != -1) 
          return true;
        return false;
      }).sort( (a: string, b:string) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      })
    }
  }

  public sortArray(arrayToSort: Array<any>, property?: any, asc?: boolean): Array<any> {
    if (!asc) {
      if (property) {
        return arrayToSort.sort( (a: any, b: any) => {
          if (a[property] > b[property]) return 1;
          if (a[property] < b[property]) return -1;
          return 0;
        })
      } else {
        return arrayToSort.sort( (a: string, b:string) => {
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        })
      }
    } else {
      if (property) {
        return arrayToSort.sort( (a: any, b: any) => {
          if (a[property] < b[property]) return 1;
          if (a[property] > b[property]) return -1;
          return 0;
        })
      } else {
        return arrayToSort.sort( (a: string, b:string) => {
          if (a < b) return 1;
          if (a > b) return -1;
          return 0;
        })
      }
    }
  }

}
