import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsAboutPage } from './tabs-about.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAboutPageRoutingModule {}
