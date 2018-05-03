import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { PagerService } from '../../services/pager.service';
import { LotoService } from '../../services/loto.service';
import { PopupAddLotoItemComponent } from '../../components/popup-add-loto-item/popup-add-loto-item.component';
import { PopupEditLotoItemComponent } from '../../components/popup-edit-loto-item/popup-edit-loto-item.component';
import * as Masonry from 'masonry-layout';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';

@Component({
  selector: 'app-loto',
  templateUrl: './loto.component.html',
  styleUrls: ['./loto.component.scss']
})
export class LotoComponent implements OnInit {
  @ViewChildren('dropdownEl') dropdownEls: QueryList<DropdownComponent>;
  public arrayListItems: any;
  public dataFilter: any;
  public txtCaregory = 'All';
  public showFilter = false;
  public showMenuHeader: boolean;
  // pager object
  public pager: any = {};
  public numberPage = 15;
  public currentPage = 1;
  // paged items
  public pagedItems: any[];
  public arrayFilter: any[];

  bsModalRef: BsModalRef;
  constructor(
    private pagerSvc: PagerService,
    private modalService: BsModalService,
    private lotoSvc: LotoService
  ) { }

  ngOnInit() {
    this.lotoSvc.getDataLotoItems().then(result => {
      this.arrayListItems = result;
      this.setPage(1);
    });
    this.loadDataMasonryFunc();
    this.lotoSvc.getDataFilterLotoItems().then(result => {
      this.dataFilter = result;
    });
  }

  // select tab
  selectTabMasonry(title): void {
    this.txtCaregory = title;
    this.paginationFunc();
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
    this.pager = this.pagerSvc.getPager(this.arrayFilter, this.currentPage, this.numberPage, '', false);
    // get current page of items
    this.pagedItems = this.pager.arrayResult;

    this.loadDataMasonryFunc();
  }

  // search function
  searchFunc(): void {
    const querySearch = [
      {
        'attr': 'type',
        'name': this.txtCaregory
      }
    ];
    this.arrayFilter = this.pagerSvc.getArrayFilterFunc(this.arrayListItems, querySearch);
  }

  // masonry
  loadDataMasonryFunc(): void {
    setTimeout(function () {
      const grid = new Masonry('.grid', {
        items: '.item',
        layoutOnInit: true,
        layoutOnResize: 100,
        dragEnabled: false,
        gutter: 20,
        fitWidth: true,
        transitionDuration: '0.9s',
        hiddenStyles: {
          opacity: 0,
          scale: 0.5
        },
        layout: {
          fillGaps: true
        }
      });
    }, 50);
  }

  // show filter
  showFilterFunc(): void {
    this.showFilter = !this.showFilter;
  }

  // open modal add new
  openModalAddNew(): void {
    const initialState = {
      title: PopupAddLotoItemComponent
    };
    this.bsModalRef = this.modalService.show(PopupAddLotoItemComponent, { initialState });
  }

  // open modal add new
  openModalEdit(): void {
    const initialState = {
      title: PopupEditLotoItemComponent,
    };
    this.bsModalRef = this.modalService.show(PopupEditLotoItemComponent, { initialState });
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

}
