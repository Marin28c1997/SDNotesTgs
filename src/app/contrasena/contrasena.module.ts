import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ContrasenaPageRoutingModule } from './contrasena-routing.module';

import { ContrasenaPage } from './contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrasenaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ContrasenaPage]
})
export class ContrasenaPageModule {}
