import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {SharedModule} from 'src/app/shared/shared.module';
import {TestsTestComponent} from './tests-test.component';
import {TestQuestionComponent} from '../test-question/test-question.component';
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [TestsTestComponent, TestQuestionComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngularSvgIconModule,
        SharedModule,
        RouterModule.forChild([{
            path: '',
            component: TestsTestComponent,
        }])
    ],
})
export class TestsTestModule {
}
