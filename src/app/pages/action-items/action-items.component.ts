import { Component, OnInit, ViewChildren, QueryList, Renderer2, HostListener } from '@angular/core';
import { PagerService } from '../../services/pager.service';
import { ActionItemsService } from '../../services/action-items.service';
import { PopupAddActionItemComponent } from '../../components/popup-add-action-item/popup-add-action-item.component';
import { PopupEditActionItemComponent } from '../../components/popup-edit-action-item/popup-edit-action-item.component';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';

@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.scss']
})
export class ActionItemsComponent implements OnInit {
  @ViewChildren('titleCol') titleCols: QueryList<any>;
  @ViewChildren('dropdownEl') dropdownEls: QueryList<DropdownComponent>;
  public listItemAction: any;
  public dataFilterAction: any;
  public showFilter = false;
  public orderByType = false;
  public titleSort: string;
  public showColumnOption = false;

  public txtCaregory = 'All';
  public showMenuHeader: boolean;
  // pager object
  public pager: any = {};
  public numberPage = 15;
  public currentPage = 1;
  // paged items
  public pagedItems: any[];
  public arrayFilter: any[];
  // list data columns options
  public dataColumnOptions: any;
  bsModalRef: BsModalRef;
  constructor(
    private pagerSvc: PagerService,
    private modalService: BsModalService,
    private actionSvc: ActionItemsService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.actionSvc.getAllData().then(result => {
      this.listItemAction = result;
      this.setPage(1);
    });

    this.actionSvc.getDataFilter().then(result => {
      this.dataFilterAction = result;
    });

    // get data title option column meeting table
    this.actionSvc.getDataColumnOptions().then(result => {
      this.dataColumnOptions = result;
      console.log(this.dataColumnOptions);
    });
  }

  // select tab
  selectTabMasonry(title): void {
    this.txtCaregory = title;
    this.setPage(1);
  }

  selectNumberPage(result): void {
    this.numberPage = result.name;
    this.setPage(1);
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
    const querySearch = [
      {
        'attr': 'type',
        'name': this.txtCaregory
      }
    ];
    this.arrayFilter = this.pagerSvc.getArrayFilterFunc(this.listItemAction, querySearch);
  }

  // show column option
  showColumnOptionFunc(): void {
    this.showColumnOption = !this.showColumnOption;
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

  // remove all class
  removeClassAllItem(): void {
    this.titleCols.forEach(element => {
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
      event.currentTarget.classList.add('active');
    } else {
      this.removeClassAllItem();
    }
    this.paginationFunc();
  }

  // show filter
  showFilterFunc(): void {
    this.showFilter = !this.showFilter;
  }

  // open modal add new
  openModalAddNew(): void {
    const initialState = {
      title: PopupAddActionItemComponent
    };
    this.bsModalRef = this.modalService.show(PopupAddActionItemComponent, { initialState });
  }

  // open modal add new
  openModalEdit(): void {
    const initialState = {
      title: PopupEditActionItemComponent,
    };
    this.bsModalRef = this.modalService.show(PopupEditActionItemComponent, { initialState });
  }

  // callback header
  callbackHeaderMenuFunc(result): void {
    this.showMenuHeader = result;
  }

  // click body
  @HostListener('document:click', ['$event'])
  onClick(): void {
    this.showColumnOption = false;
  }
}
