import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsChatOpenComponent } from './tabs-chat-open/tabs-chat-open.component';

import { TabsChatPage } from './tabs-chat.page';

const routes: Routes = [
  {
    path: '',
    component: TabsChatPage
  },
  {
    path: ':id',
    component: TabsChatOpenComponent,
    loadChildren: () => import('./tabs-chat-open/tabs-chat-open.module').then( m => m.TabsChatOpenModule)

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsChatPageRoutingModule {}
