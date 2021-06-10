import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsChatPageRoutingModule } from './tabs-chat-routing.module';

import { TabsChatPage } from './tabs-chat.page';
import { TabsChatInterlocutorComponent } from './tabs-chat-interlocutor/tabs-chat-interlocutor.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    TabsChatPageRoutingModule
  ],
  declarations: [TabsChatPage, TabsChatInterlocutorComponent]
})
export class TabsChatPageModule {}
