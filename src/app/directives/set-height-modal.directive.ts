import { Directive, ElementRef, HostListener, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appSetHeightModal]'
})
export class SetHeightModalDirective implements AfterViewChecked {
  constructor(private el: ElementRef) {
  }
  // after view checked
  ngAfterViewChecked(): void {
    this.setHeightModalFunc();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.setHeightModalFunc();
  }
  // set height function
  setHeightModalFunc(): void {
    const heightWindow = window.innerHeight;
    const heightElement = this.el.nativeElement.offsetHeight;
    this.el.nativeElement.style.top = (heightWindow - heightElement) / 2 + 'px';
    this.el.nativeElement.style.position = 'relative';
  }
}
