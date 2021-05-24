import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsOfflinePage } from './tabs-offline.page';

const routes: Routes = [
  {
    path: '',
    component: TabsOfflinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsOfflinePageRoutingModule {}
