import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsTestsPageRoutingModule } from './tabs-tests-routing.module';

import { TabsTestsPage } from './tabs-tests.page';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { TestQuestionComponent } from './test-question/test-question.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    TabsTestsPageRoutingModule
  ],
  declarations: [TabsTestsPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],

})
export class TabsTestsPageModule {}
