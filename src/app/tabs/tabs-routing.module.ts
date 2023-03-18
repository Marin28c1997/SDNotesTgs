import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {

    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'asignatura',
        loadChildren: () => import('../asignatura/asignatura.module').then(m => m.AsignaturaPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'horario',
        loadChildren: () => import('../horario/horario.module').then(m => m.HorarioPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/asignatura',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/asignatura',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
