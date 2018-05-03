import { Component, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss']
})
export class DatepickerRangeComponent implements OnChanges {
  @ViewChild('dStart') eldStart;
  @ViewChild('dEnd') eldEnd;
  @Input() data: any;
  @Input() typeDate = 'range';
  @Output() changeDate = new EventEmitter();
  private startDateFilter: Date;
  private endDateFilter: Date;
  public today = new Date();
  bsConfig = {
    showWeekNumbers: false,
    dateDisabled: true
  };
  constructor() { }

  ngOnChanges(): void { }
  // listen select datepicker
  changeStartFunc() {
    this.changeDate.emit({
      startDate: this.startDateFilter,
      endDate: this.endDateFilter
    });
  }

  // listen select datepicker
  changeEndFunc() {
    this.changeDate.emit({
      startDate: this.startDateFilter,
      endDate: this.endDateFilter
    });
  }
}
