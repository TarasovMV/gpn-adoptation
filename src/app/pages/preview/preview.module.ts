import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PreviewPageRoutingModule } from './preview-routing.module';
import { PreviewPage } from './preview.page';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    PreviewPageRoutingModule,
    SharedModule
  ],
  declarations: [PreviewPage]
})
export class PreviewPageModule {}
