import { BrowserModule } from '@angular/platform-browser';

// modulos
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// componentes
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
