import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() callback = new EventEmitter();
  public showMenu = false;
  constructor() { }

  ngOnInit() {
  }

  clickShowMenuFunc(): void {
    this.showMenu = !this.showMenu;
    this.callback.emit(this.showMenu);
  }
}
