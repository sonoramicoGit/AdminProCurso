import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const RUTAS_HIJAS: Routes = [
  // seran rutas hijas
  { path: 'dashboard', component: PagesComponent,  // el componente de las rutas protegidas
  children: [
    { path: '', component: DashboardComponent},
    { path: 'progress', component: ProgressComponent},
    { path: 'grafica1', component: Grafica1Component},
    { path: 'account-settings', component: AccountSettingsComponent}
  ]},
];

@NgModule({
    imports: [RouterModule.forChild(RUTAS_HIJAS)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
