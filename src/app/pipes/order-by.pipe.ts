import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], columns: string, value: boolean): any {
    if (array) {
      if (typeof value !== 'undefined') {
        if (value) {
          array.sort((a: any, b: any) => {
            if (a[columns] > b[columns]) {
              return -1;
            } else if (a[columns] < b[columns]) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          array.sort((a: any, b: any) => {
            if (a[columns] < b[columns]) {
              return -1;
            } else if (a[columns] > b[columns]) {
              return 1;
            } else {
              return 0;
            }
          });
        }
      }
    }
    return array;
  }

}
