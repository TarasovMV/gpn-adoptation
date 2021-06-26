import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'preview',
        loadChildren: () => import('./pages/preview/preview.module').then(m => m.PreviewPageModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
    },
    {
        path: 'tabs',
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'start',
        loadChildren: () => import('./pages/start-page/start-page.module').then(m => m.StartPageModule)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
