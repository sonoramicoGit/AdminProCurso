import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';

const RUTASPADRE: Routes = [
    // seran rutas padre
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
 ];

@NgModule({
    imports: [RouterModule.forChild(RUTASPADRE)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
