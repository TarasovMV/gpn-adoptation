import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestQuestionComponent } from './test-question.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [TestQuestionComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    SharedModule
  ]
})
export class TestQuestionModule { }
