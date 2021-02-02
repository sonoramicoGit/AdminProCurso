import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';

const RUTAS_HIJAS: Routes = [
  // seran rutas hijas
  { path: 'dashboard', component: PagesComponent,  canActivate: [AuthGuard], // el componente de las rutas protegidas
  children: [
    { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}},
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Temas'}},
    { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica'}},
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'}},
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'}}
  ]},
];

@NgModule({
    imports: [RouterModule.forChild(RUTAS_HIJAS)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
