import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  status: false;
  constructor(private usuarioService: UsuarioService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    console.log('Paso por AuthGuard----> :)');
    let ban = this.usuarioService.validarToken()
      .pipe(//manejamos por aca e
        tap((esAuth) => {
          if (!esAuth) {
            this.router.navigateByUrl('/login');
          }
        })
      );
    return ban;
  }

}
