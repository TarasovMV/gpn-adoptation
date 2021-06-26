import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StartPageComponent } from './start-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StartPageRoutingModule } from './start-page-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartPageRoutingModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
],
declarations: [StartPageComponent]
})
export class StartPageModule { }
