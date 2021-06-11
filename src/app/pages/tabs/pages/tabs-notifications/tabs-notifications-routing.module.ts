import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsNotificationsPage } from './tabs-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: TabsNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsNotificationsPageRoutingModule {}
