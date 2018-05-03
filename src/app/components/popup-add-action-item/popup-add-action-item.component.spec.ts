import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddActionItemComponent } from './popup-add-action-item.component';

describe('PopupAddActionItemComponent', () => {
  let component: PopupAddActionItemComponent;
  let fixture: ComponentFixture<PopupAddActionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAddActionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddActionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
