import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HorarioPage } from './horario.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HorarioPageRoutingModule } from './horario-routing.module';

import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    HorarioPageRoutingModule,
    CalendarModule,
  ],
  declarations: [HorarioPage]
})
export class HorarioPageModule {}
