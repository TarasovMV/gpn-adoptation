import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsChatOpenComponent } from './tabs-chat-open.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [TabsChatOpenComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule
  ]
})
export class TabsChatOpenModule { }
