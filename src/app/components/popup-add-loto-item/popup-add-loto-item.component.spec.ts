import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddLotoItemComponent } from './popup-add-loto-item.component';

describe('PopupAddLotoItemComponent', () => {
  let component: PopupAddLotoItemComponent;
  let fixture: ComponentFixture<PopupAddLotoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAddLotoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddLotoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
