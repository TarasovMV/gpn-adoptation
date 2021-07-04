import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TabsOfflineMoreComponent} from './tabs-offline-more/tabs-offline-more.component';

import {TabsOfflinePage} from './tabs-offline.page';

const routes: Routes = [
    {
        path: '',
        component: TabsOfflinePage
    },
    // {
    //     path: ':id',
    //     component: TabsOfflineMoreComponent,
    //     loadChildren: () => import('./tabs-offline-more/tabs-offline-more.module').then(m => m.TabsOfflineMoreModule)
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsOfflinePageRoutingModule {
}
