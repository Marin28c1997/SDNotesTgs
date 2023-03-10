import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorarioPage } from './horario.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HorarioPageRoutingModule } from './horario-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HorarioPageRoutingModule
  ],
  declarations: [HorarioPage]
})
export class HorarioPageModule {}
