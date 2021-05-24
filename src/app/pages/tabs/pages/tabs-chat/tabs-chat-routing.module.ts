import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsChatPage } from './tabs-chat.page';

const routes: Routes = [
  {
    path: '',
    component: TabsChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsChatPageRoutingModule {}
