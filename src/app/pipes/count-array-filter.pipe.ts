import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countArrayFilter'
})
export class CountArrayFilterPipe implements PipeTransform {

  transform(array: any[], attr: string, value: string): any {
    if (array) {
      if (attr === 'My Meetings') {
        array = array.filter(item => {
          return item.leader.name.toLowerCase() === value.toLowerCase();
        });
      } else if (attr === 'My Reports') {
        array = array.filter(item => {
          for (let index = 0; index < item.tableChild.length; index++) {
            const element = item.tableChild[index];
            if (element.supervisor.toLowerCase() === value.toLowerCase()) {
              return true;
            }
          }
          return false;
        });
      } else if (attr === 'Not Attended') {
        array = array.filter(item => {
          for (let index = 0; index < item.tableChild.length; index++) {
            const element = item.tableChild[index];
            if (element.supervisor.toLowerCase() !== value.toLowerCase() && item.leader.name.toLowerCase() !== value.toLowerCase()) {
              return true;
            }
          }
          return false;
        });
      } else if (attr === 'type') {
        array = array.filter(item => {
          if (value.toLowerCase() === 'all') {
            return true;
          }
          return item.type.toLowerCase() === value.toLowerCase();
        });
      }
      return array.length;
    }
    return 0;
  }

}
