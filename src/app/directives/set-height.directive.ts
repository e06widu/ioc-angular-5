import { Directive, AfterViewInit, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSetHeight]'
})
export class SetHeightDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
  }
  ngAfterViewInit(): void {
    this.setHeightFunc();
  }

  // listen window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.setHeightFunc();
  }
  // set height function
  setHeightFunc(): void {
    const that = this;
    this.el.nativeElement.style.height = 'auto';
    setTimeout(function () {
      const heightElement = that.el.nativeElement.offsetHeight;
      const heightWindow = window.innerHeight;
      if (heightElement + 80 < heightWindow) {
        // that.el.nativeElement.style.height = heightWindow - 80 + 'px';
      }
    }, 50);
  }
}
