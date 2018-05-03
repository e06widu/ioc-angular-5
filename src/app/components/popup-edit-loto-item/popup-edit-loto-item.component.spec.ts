import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditLotoItemComponent } from './popup-edit-loto-item.component';

describe('PopupEditLotoItemComponent', () => {
  let component: PopupEditLotoItemComponent;
  let fixture: ComponentFixture<PopupEditLotoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupEditLotoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEditLotoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
