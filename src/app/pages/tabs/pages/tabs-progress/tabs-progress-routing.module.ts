import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProgressCardComponent} from './progress-card/progress-card.component';
import {TabsProgressPage} from './tabs-progress.page';

const routes: Routes = [
    {
        path: '',
        component: TabsProgressPage,
    },
    {
        path: ':id',
        component: ProgressCardComponent,
        loadChildren: () => import('./progress-card/progress-card.module').then(m => m.ProgressCardModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
})
export class TabsProgressPageRoutingModule {
}
