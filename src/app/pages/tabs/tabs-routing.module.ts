import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'tabs-progress',
        pathMatch: 'full',
    },
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'tabs-news',
                loadChildren: () => import('./pages/tabs-news/tabs-news.module').then( m => m.TabsNewsPageModule)
            },
            {
                path: 'tabs-chat',
                loadChildren: () => import('./pages/tabs-chat/tabs-chat.module').then( m => m.TabsChatPageModule)
            },
            {
                path: 'tabs-tests',
                loadChildren: () => import('./pages/tabs-tests/tabs-tests.module').then( m => m.TabsTestsPageModule)
            },
            {
                path: 'tabs-about',
                loadChildren: () => import('./pages/tabs-about/tabs-about.module').then( m => m.TabsAboutPageModule)
            },
            {
                path: 'tabs-progress',
                loadChildren: () => import('./pages/tabs-progress/tabs-progress.module').then( m => m.TabsProgressPageModule),
            },
            {
                path: 'tabs-offline',
                loadChildren: () => import('./pages/tabs-offline/tabs-offline.module').then( m => m.TabsOfflinePageModule)
            },
            {
                path: 'tabs-notifications',
                loadChildren: () => import('./pages/tabs-notifications/tabs-notifications.module').then( m => m.TabsNotificationsPageModule)
            }
        ],
    },
    // {
    //     path: '**',
    //     redirectTo: 'tabs-news',
    //     pathMatch: 'full',
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
