import { Component, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ActionItemsService } from '../../services/action-items.service';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-popup-add-action-item',
  templateUrl: './popup-add-action-item.component.html',
  styleUrls: ['./popup-add-action-item.component.scss']
})
export class PopupAddActionItemComponent implements AfterViewInit {
  @ViewChildren('dropdownEl') dropdownEls: QueryList<DropdownComponent>;
  public dataActionPopup: any;
  public objPeople: string;
  public arrayPeople = [];
  constructor(public bsModalRef: BsModalRef, private actionSvc: ActionItemsService) { }

  ngAfterViewInit() {
    this.actionSvc.getDataActionPopup().then(result => {
      this.dataActionPopup = result;
    });
  }

  callbackDropdownItemFunc(result): void {
    this.objPeople = result;
  }

  addNamePeopleFunc(): void {
    if (this.objPeople !== undefined) {
      this.arrayPeople.push(this.objPeople);
    }
  }

  deleteItemFunc(index): void {
    this.arrayPeople.splice(index, 1);
  }

}
