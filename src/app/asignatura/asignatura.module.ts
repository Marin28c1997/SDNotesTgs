import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsignaturaPage } from './asignatura.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AsignaturaPageRoutingModule } from './asignatura-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AsignaturaPageRoutingModule
  ],
  declarations: [AsignaturaPage]
})
export class AsignaturaPageModule {}
