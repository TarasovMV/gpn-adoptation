import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsProgressPage } from './tabs-progress.page';

const routes: Routes = [
  {
    path: '',
    component: TabsProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsProgressPageRoutingModule {}
