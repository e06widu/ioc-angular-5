import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { RoutingModule } from '../app/routing.module';

import { AppComponent } from './app.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { ActionItemsComponent } from './pages/action-items/action-items.component';
import { LotoComponent } from './pages/loto/loto.component';
import { HeaderComponent } from './components/header/header.component';
import { DatepickerRangeComponent } from './components/datepicker-range/datepicker-range.component';
import { PopupAddActionItemComponent } from './components/popup-add-action-item/popup-add-action-item.component';
import { PopupEditActionItemComponent } from './components/popup-edit-action-item/popup-edit-action-item.component';
import { PopupAddLotoItemComponent } from './components/popup-add-loto-item/popup-add-loto-item.component';
import { PopupEditLotoItemComponent } from './components/popup-edit-loto-item/popup-edit-loto-item.component';
import { LeftAsideComponent } from './components/left-aside/left-aside.component';
import { PagerService } from './services/pager.service';
import { MeetingsService } from './services/meetings.service';
import { ActionItemsService } from './services/action-items.service';
import { LotoService } from './services/loto.service';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterListItemPipe } from './pipes/filter-list-item.pipe';
import { SetHeightModalDirective } from './directives/set-height-modal.directive';
import { CountArrayFilterPipe } from './pipes/count-array-filter.pipe';
import { SetHeightDirective } from './directives/set-height.directive';


@NgModule({
  declarations: [
    AppComponent,
    MeetingsComponent,
    ActionItemsComponent,
    LotoComponent,
    HeaderComponent,
    DatepickerRangeComponent,
    PopupAddActionItemComponent,
    PopupEditActionItemComponent,
    PopupAddLotoItemComponent,
    PopupEditLotoItemComponent,
    LeftAsideComponent,
    DropdownComponent,
    OrderByPipe,
    FilterListItemPipe,
    SetHeightModalDirective,
    CountArrayFilterPipe,
    SetHeightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [OrderByPipe, FilterListItemPipe, PagerService, MeetingsService, ActionItemsService, LotoService],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupAddActionItemComponent,
    PopupEditActionItemComponent,
    PopupAddLotoItemComponent,
    PopupEditLotoItemComponent
  ]
})
export class AppModule { }
