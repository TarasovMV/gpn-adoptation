import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressCardComponent } from './progress-card.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [ProgressCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule
  ],
})
export class ProgressCardModule { }
