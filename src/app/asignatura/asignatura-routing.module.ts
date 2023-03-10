import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignaturaPage } from './asignatura.page';

const routes: Routes = [
  {
    path: '',
    component: AsignaturaPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignaturaPageRoutingModule {}
