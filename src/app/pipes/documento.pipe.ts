import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'document'})
export class DocumentoPipe implements PipeTransform {
  transform(value): string {
    if (value) {
      const valueCopy = value;
      const firstPart = valueCopy.substring(0,2);
      if (firstPart.length < 2) {
        return `${firstPart}`;
      } else {
        if (firstPart.length == 2) {
          const secondPart = valueCopy.substring(3,6);
          if (secondPart.length) {
            const thirdPart = valueCopy.substring(7,11);
            if (secondPart.length == 3 && !thirdPart.length) {
              return `${firstPart}.${secondPart}.`;
            } else {
              if (thirdPart.length) {
                return `${firstPart}.${secondPart}.${thirdPart}`;
              } else {
                return `${firstPart}.${secondPart}`;
              }
            }
          } else {
            return `${firstPart}.${secondPart}`;
          }
        }
      }
    }
    return '';
  }
}