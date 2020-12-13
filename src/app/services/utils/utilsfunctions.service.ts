import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsfunctionsService {

  constructor() { }

  lettersRegex: RegExp = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s ]*)$/;
  dniRegex: RegExp = /^(\d{2}\.{1}\d{3}\.\d{3})|(\d{2}\s{1}\d{3}\s\d{3})$/;
  noFirstBlankSpace: RegExp = /^\S.*$/;
  noWhiteSpace = /^\S*$/;
  numberRegex = /^$|^(\+\d{1,2})?\d{7,}$/;

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

  public equalsDate(date: Date, date2: Date): boolean {
    var year = date.getFullYear();
    var mes = date.getMonth()+1;
    var dia = date.getDate();
    var fecha = dia+"-"+mes+"-"+year;

    var year2 = date2.getFullYear();
    var mes2 = date2.getMonth()+1;
    var dia2 = date2.getDate();
    var fecha2 = dia2+"-"+mes2+"-"+year2;

    return (fecha === fecha2);
  }

}
