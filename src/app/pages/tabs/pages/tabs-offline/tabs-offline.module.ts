import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, IonSlides} from '@ionic/angular';
import {TabsOfflinePageRoutingModule} from './tabs-offline-routing.module';
import {TabsOfflinePage} from './tabs-offline.page';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {TabsOfflineSearchComponent} from './components/tabs-offline-search/tabs-offline-search.component';
import { TabsOfflineRecommendationComponent } from './components/tabs-offline-recommendation/tabs-offline-recommendation.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabsOfflinePageRoutingModule,
        AngularSvgIconModule,
        ReactiveFormsModule,
        
    ],
    declarations: [TabsOfflinePage, TabsOfflineSearchComponent, TabsOfflineRecommendationComponent],
    exports: [TabsOfflineSearchComponent]
})
export class TabsOfflinePageModule {
}
