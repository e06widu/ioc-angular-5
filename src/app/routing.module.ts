import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MeetingsComponent } from './pages/meetings/meetings.component';
import { ActionItemsComponent } from './pages/action-items/action-items.component';
import { LotoComponent } from './pages/loto/loto.component';


const routes: Routes = [
  {
    path: 'meetings',
    component: MeetingsComponent,
    data: { title: 'Meetings' }
  },
  {
    path: 'action-items',
    component: ActionItemsComponent,
    data: { title: 'Action Items' }
  },
  {
    path: 'loto',
    component: LotoComponent,
    data: { title: 'Loto' }
  },
  {
    path: '',
    redirectTo: '/meetings',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/meetings',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
