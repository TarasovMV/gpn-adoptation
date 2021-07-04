import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressCardComponent } from './progress-card.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {SharedModule} from "../../../../../shared/shared.module";
import { ProgressCardImageComponent } from '../components/progress-card-image/progress-card-image.component';
import { ProgressCardImageSquadComponent } from '../components/progress-card-image-squad/progress-card-image-squad.component';
import { ProgressCardUsualTextComponent } from '../components/progress-card-usual-text/progress-card-usual-text.component';
import { ProgressCardButtonComponent } from '../components/progress-card-button/progress-card-button.component';
import { ProgressCardAccentTextComponent } from '../components/progress-card-accent-text/progress-card-accent-text.component';
import { ProgressCardVideoComponent } from '../components/progress-card-video/progress-card-video.component';
import { ProgressCardTerminComponent } from '../components/progress-card-termin/progress-card-termin.component';
import { ProgressCardAttentionComponent } from '../components/progress-card-attention/progress-card-attention.component';
import { ProgressCardBlockComponent } from '../components/progress-card-block/progress-card-block.component';
import { ProgressCardPointsComponent } from '../components/progress-card-points/progress-card-points.component';
import { ProgressCardFileComponent } from '../components/progress-card-file/progress-card-file.component';
import { ProgressCardMoreComponent } from '../components/progress-card-more/progress-card-more.component';
import { ProgressCardBlitzComponent } from '../components/progress-card-blitz/progress-card-blitz.component';
import { ProgressCardManualInputComponent } from '../components/progress-card-manual-input/progress-card-manual-input.component';

@NgModule({
  declarations: [
    ProgressCardComponent,
    ProgressCardImageComponent,
    ProgressCardImageSquadComponent,
    ProgressCardUsualTextComponent,
    ProgressCardButtonComponent,
    ProgressCardVideoComponent,
    ProgressCardAccentTextComponent,
    ProgressCardTerminComponent,
    ProgressCardAttentionComponent,
    ProgressCardBlockComponent,
    ProgressCardPointsComponent,
    ProgressCardFileComponent,
    ProgressCardMoreComponent,
    ProgressCardBlitzComponent,
    ProgressCardManualInputComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngularSvgIconModule,
        SharedModule
    ],
})
export class ProgressCardModule { }
