import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-popup-edit-loto-item',
  templateUrl: './popup-edit-loto-item.component.html',
  styleUrls: ['./popup-edit-loto-item.component.scss']
})
export class PopupEditLotoItemComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
