import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [
// se creo nuevo archivo de rutas para las hijas  PagesRoutingModule
// path: /dashboard PagesRoutingModule
// se creo nuevo archivo de rutas para las hijas  AuthRoutingModule
// path: /auth AuthRoutingModule
   {path: '',  redirectTo: '/dashboard' , pathMatch: 'full'},
   {path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule

  ]
})
export class AppRoutingModule { }
