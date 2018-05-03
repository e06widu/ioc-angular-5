import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditActionItemComponent } from './popup-edit-action-item.component';

describe('PopupEditActionItemComponent', () => {
  let component: PopupEditActionItemComponent;
  let fixture: ComponentFixture<PopupEditActionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupEditActionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEditActionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
