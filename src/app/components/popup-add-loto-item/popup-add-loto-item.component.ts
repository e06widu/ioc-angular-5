import { Component, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { LotoService } from '../../services/loto.service';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-popup-add-loto-item',
  templateUrl: './popup-add-loto-item.component.html',
  styleUrls: ['./popup-add-loto-item.component.scss']
})
export class PopupAddLotoItemComponent implements AfterViewInit {
  @ViewChildren('dropdownEl') dropdownEls: QueryList<DropdownComponent>;
  public dataFilter: any;
  constructor(
    public bsModalRef: BsModalRef,
    private lotoSvc: LotoService
  ) { }

  ngAfterViewInit() {
    this.lotoSvc.getDataFilterLotoItems().then(result => {
      this.dataFilter = result;
    });
  }

}
