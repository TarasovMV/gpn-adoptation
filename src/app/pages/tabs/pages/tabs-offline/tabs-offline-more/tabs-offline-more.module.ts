import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsOfflineMoreComponent } from './tabs-offline-more.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [TabsOfflineMoreComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule
  ]
})
export class TabsOfflineMoreModule { }
