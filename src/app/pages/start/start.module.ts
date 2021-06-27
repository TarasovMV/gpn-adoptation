import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StartComponent } from './start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StartRoutingModule } from './start-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartRoutingModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
],
declarations: [StartComponent]
})
export class StartModule { }
