import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-aside',
  templateUrl: './left-aside.component.html',
  styleUrls: ['./left-aside.component.scss']
})
export class LeftAsideComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showListGroupFunc(event): void {
    if (event.currentTarget.parentElement.parentElement.classList.contains('active')) {
      event.currentTarget.parentElement.parentElement.classList.remove('active');
    } else {
      event.currentTarget.parentElement.parentElement.classList.add('active');
    }
  }
}
