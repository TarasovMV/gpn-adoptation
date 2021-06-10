import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsAboutPersonComponent } from './components/tabs-about-person/tabs-about-person.component';

import { TabsAboutPage } from './tabs-about.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAboutPage
  },
  {
    path: ':id',
    component: TabsAboutPersonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAboutPageRoutingModule {}
