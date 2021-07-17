import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, IonSlides} from '@ionic/angular';
import {TabsOfflinePageRoutingModule} from './tabs-offline-routing.module';
import {TabsOfflinePage} from './tabs-offline.page';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {TabsOfflineSearchComponent} from './components/tabs-offline-search/tabs-offline-search.component';
import { TabsOfflineRecommendationComponent } from './components/tabs-offline-recommendation/tabs-offline-recommendation.component';
import { TabsOfflineStoriesComponent } from './components/tabs-offline-stories/tabs-offline-stories.component';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabsOfflinePageRoutingModule,
        AngularSvgIconModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [
        TabsOfflinePage,
        TabsOfflineSearchComponent,
        TabsOfflineRecommendationComponent,
        TabsOfflineStoriesComponent
    ],
    exports: [TabsOfflineSearchComponent]
})
export class TabsOfflinePageModule {
}
