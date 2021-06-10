import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';

import { PreviewPage } from './preview.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewPageRoutingModule { }
