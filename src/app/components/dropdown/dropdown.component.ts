import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, Renderer2, ViewChildren, QueryList, ViewChild, OnInit
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  private showDropdown = false;
  @Input() listDropdown: any[];
  @Input() selectOption: any;
  @Input() type: string;
  @Input() dropdownEls: QueryList<DropdownComponent>;
  @Output() callbaclSelectDropdown = new EventEmitter();
  @ViewChild('contentDropdown') contentDropdownEl: ElementRef;
  private colorName: any;
  constructor(
    private _el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (this.selectOption !== 'Select') {
      this.renderer.addClass(this.contentDropdownEl.nativeElement, 'select-text');
    }
  }

  removeClassAllDropdow(): void {
    if (this.dropdownEls) {
      this.dropdownEls.forEach(element => {
        element.hiddenDropdownFunc();
      });
    }
  }

  hiddenDropdownFunc(): void {
    this.renderer.removeClass(this.contentDropdownEl.nativeElement, 'show-dropdown');
  }

  // show dropdown
  showDropdownFunc(event): void {
    if (event.currentTarget.parentElement.classList.contains('show-dropdown')) {
      this.removeClassAllDropdow();
    } else {
      this.removeClassAllDropdow();
      event.currentTarget.parentElement.classList.add('show-dropdown');
    }
  }

  // select item
  selectItem(item, event): void {
    const elementGroup = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
    this.colorName = item.name;
    elementGroup.classList.add('select-text');
    this.selectOption = item.name;
    this.showDropdown = false;
    this.callbaclSelectDropdown.emit(item);
  }

  // click body
  @HostListener('document:click', ['$event'])
  onClick(): void {
    this.removeClassAllDropdow();
  }
}
