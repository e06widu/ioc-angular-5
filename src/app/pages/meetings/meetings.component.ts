import { Component, OnInit, ElementRef, HostListener, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { PagerService } from '../../services/pager.service';
import { MeetingsService } from '../../services/meetings.service';
import { ActionItemsService } from '../../services/action-items.service';
import { FilterListItemPipe } from '../../pipes/filter-list-item.pipe';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
  providers: [FilterListItemPipe]
})
export class MeetingsComponent implements OnInit {
  @ViewChildren('titleCol') titleCols: QueryList<any>;
  @ViewChildren('titleChildCol') titleChildCols: QueryList<any>;
  @ViewChildren('btnFilterTable') btnFilterTables: QueryList<any>;
  @ViewChildren('dropdownEl') dropdownEls: QueryList<DropdownComponent>;
  // array of all items to be paged
  public allItemsMeetings: any;
  public arrayFilter: any;
  public dataColumnOption: any;
  public orderByType = false;
  public titleSort: string;
  public titleSortChildTable: string;
  public orderByTypeChild = false;
  public showColumnOption = false;

  public showMenuHeader: boolean;
  // pager object
  public pager: any = {};
  public numberPage = 15;
  public currentPage = 1;
  public userName = 'Rachel Elliott';
  public queryFilter = this.userName;
  public attrFilter = 'My Meetings';
  public startDate: any;
  public endDate: any;
  // paged items
  public pagedItems: any[];
  public dataFilterAction: any;
  filterPipe: any;
  constructor(
    private pagerSvc: PagerService,
    private meetingsSVc: MeetingsService,
    private _el: ElementRef,
    private actionSvc: ActionItemsService,
    private renderer: Renderer2
  ) {
    this.filterPipe = new FilterListItemPipe();
  }

  ngOnInit() {
    // get data title option column meeting table
    this.meetingsSVc.getDataColumnOptions().then(result => {
      this.dataColumnOption = result;
    });
    // get data meeting
    this.meetingsSVc.getAllData().then(result => {
      this.allItemsMeetings = result;
      this.setPage(1);
    });
    this.meetingsSVc.getDataFilter().then(result => {
      this.dataFilterAction = result;
    });
  }

  // set page
  setPage(page: number) {
    this.currentPage = page;
    this.paginationFunc();
  }

  // pagination function
  paginationFunc(): void {
    if (this.currentPage < 1 || this.currentPage > this.pager.totalPages) {
      return;
    }
    this.searchFunc();
    // get pager object from service
    this.pager = this.pagerSvc.getPager(this.arrayFilter, this.currentPage, this.numberPage, this.titleSort, this.orderByType);
    // get current page of items
    this.pagedItems = this.pager.arrayResult;
  }

  // search function
  searchFunc(): void {
    let querySearch;
    if (this.startDate) {
      querySearch = [
        {
          'attr': this.attrFilter,
          'name': this.queryFilter
        },
        {
          'attr': 'date',
          'startDate': this.startDate,
          'endDate': this.endDate
        }
      ];
    } else {
      querySearch = [
        {
          'attr': this.attrFilter,
          'name': this.queryFilter
        }
      ];
    }
    this.arrayFilter = this.pagerSvc.getArrayFilterFunc(this.allItemsMeetings, querySearch);
    console.log(querySearch);
    console.log(this.arrayFilter);
  }

  // show content table
  showContentTableFunc(event): void {
    const elementView = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    if (elementView.classList.contains('expand-ver')) {
      elementView.classList.remove('expand-ver');
    } else {
      elementView.classList.add('expand-ver');
    }
  }

  // remove all class active title column
  removeClassAllItem(): void {
    this.titleCols.forEach(element => {
      this.renderer.removeClass(element.nativeElement, 'active');
    });
  }

  // remove all class active child title column
  removeClassChildColFunc(): void {
    this.titleChildCols.forEach(element => {
      this.renderer.removeClass(element.nativeElement, 'active');
    });
  }

  // sort by
  clickSortBy(name, event): void {
    if (this.titleSort === name) {
      this.orderByType = !this.orderByType;
    } else {
      this.orderByType = true;
    }
    this.titleSort = name;
    if (this.orderByType) {
      this.removeClassAllItem();
      this.renderer.addClass(event.currentTarget, 'active');
    } else {
      this.removeClassAllItem();
    }
    this.paginationFunc();
  }

  // sort by child table
  clickSortByChildTable(element, name, event): void {
    if (this.titleSortChildTable === name) {
      this.orderByTypeChild = !this.orderByTypeChild;
    } else {
      this.orderByTypeChild = true;
    }
    this.titleSortChildTable = name;
    if (this.orderByTypeChild) {
      this.removeClassChildColFunc();
      this.renderer.addClass(event.currentTarget, 'active');
    } else {
      this.removeClassChildColFunc();
    }
    element.tableChild = this.pagerSvc.getDataArraySort(element.tableChild, this.titleSortChildTable, this.orderByTypeChild);
  }

  // click filter table
  filterTableFunc(event, attr): void {
    this.btnFilterTables.forEach(element => {
      this.renderer.removeClass(element.nativeElement, 'active');
    });
    event.currentTarget.parentElement.classList.add('active');
    this.attrFilter = attr;
    this.searchFunc();
    this.setPage(1);
  }

  // slick search Function
  clickSearChFunc(): void {
    this.searchFunc();
    this.setPage(1);
  }

  // show column option
  showColumnOptionFunc(): void {
    this.showColumnOption = !this.showColumnOption;
  }

  // show hide colums item
  selectColumnsItem(item): void {
    item.isCheck = !item.isCheck;
  }

  // callback number page
  selectNumberPage(result): void {
    this.numberPage = result.name;
    this.setPage(1);
  }

  // callback header
  callbackHeaderMenuFunc(result): void {
    this.showMenuHeader = result;
  }

  // callback select datepicker
  callbackDatePickerFunc(result): void {
    this.startDate = result.startDate;
    this.endDate = result.endDate;
    if (this.allItemsMeetings) {
      console.log(this.startDate);
      this.searchFunc();
      this.setPage(1);
    }
  }

  // click body
  @HostListener('document:click', ['$event'])
  onClick(): void {
    this.showColumnOption = false;
  }

}
