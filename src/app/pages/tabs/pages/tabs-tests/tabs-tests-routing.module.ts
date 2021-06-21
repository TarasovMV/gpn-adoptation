import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsTestsPage } from './tabs-tests.page';
import { TestsTestComponent } from './tests-test/tests-test.component';

const routes: Routes = [
  {
    path: '',
    component: TabsTestsPage
  },
  {
    path: ':id',
    component: TestsTestComponent,
    loadChildren: () => import('./tests-test/tests-test.module').then( m => m.TestsTestModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsTestsPageRoutingModule {}
