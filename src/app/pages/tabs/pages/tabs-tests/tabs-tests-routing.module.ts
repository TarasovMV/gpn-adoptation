import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsTestsPage } from './tabs-tests.page';

const routes: Routes = [
  {
    path: '',
    component: TabsTestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsTestsPageRoutingModule {}
