import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {StartScreenGuard} from "./core/guards/start-screen.guard";
import {AuthorizeGuard} from "./core/guards/authorize.guard";

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
    },
    {
        path: 'tabs',
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
        canActivate: [AuthorizeGuard],
    },
    {
        path: 'start',
        loadChildren: () => import('./pages/start/start.module').then(m => m.StartModule),
        canActivate: [StartScreenGuard],
    },
    {
        path: 'info',
        loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule)
    },
    {
        path: '',
        redirectTo: 'start',
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
