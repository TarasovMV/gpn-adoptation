import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsChatPageRoutingModule } from './tabs-chat-routing.module';

import { TabsChatPage } from './tabs-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsChatPageRoutingModule
  ],
  declarations: [TabsChatPage]
})
export class TabsChatPageModule {}
