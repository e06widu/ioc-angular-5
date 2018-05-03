import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { FilterListItemPipe } from '../pipes/filter-list-item.pipe';

@Injectable()
export class PagerService {

  constructor(
    private orderByPipe: OrderByPipe,
    private filterPipe: FilterListItemPipe
  ) { }
  getPager(arrayData: any[], currentPage: number = 1, pageSize: number, sortTitle: string, orderByType: boolean) {
    // calculate total pages
    const totalItems = arrayData.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 11) {
        startPage = 1;
        endPage = pageSize;
      } else if (currentPage + 9 >= totalPages) {
        startPage = totalPages - 14;
        endPage = totalPages;
      } else {
        startPage = currentPage - 10;
        endPage = currentPage + 9;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);
    // array after pagination
    let arrayResult = arrayData.slice(startIndex, endIndex + 1);
    if (sortTitle && sortTitle !== '') {
      arrayResult = this.orderByPipe.transform(arrayResult, sortTitle, orderByType);
    }
    // return object with all pager properties required by the view
    return {
      arrayResult: arrayResult,
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  // filter data table
  getArrayFilterFunc(array: any[], querys: any[]) {
    if (array) {
      for (let i = 0; i < querys.length; i++) {
        const element = querys[i];
        if (element.attr === 'date' && element.startDate) {
          const startDate = new Date(element.startDate);
          array = array.filter(item => {
            const dateItem = new Date(item.date);
            if (startDate <= dateItem) {
              return true;
            }
            return false;
          });
        } else if (element.attr === 'date' && element.endDate) {
          const endDate = new Date(element.endDate);
          array = array.filter(item => {
            const dateItem = new Date(item.date);
            if (endDate >= dateItem) {
              return true;
            }
            return false;
          });
        } else {
          array = this.filterPipe.transform(array, element.attr, element.name);
        }
      }
      return array;
    }
    return;
  }

  // sort data function
  getDataArraySort(arrayData: any[], sortTitle: string, orderByType: boolean) {
    return this.orderByPipe.transform(arrayData, sortTitle, orderByType);
  }
}
