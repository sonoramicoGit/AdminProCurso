import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterFormI } from '../interfaces/register-form-interface';
import { environment } from '../../environments/environment.prod';
import { LoginFormI } from '../interfaces/login-form-interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

const url = environment.base_url;
declare const gapi: any;// se define la constante usada en funcion renderButton  google login
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;//manejo de login google
  constructor(private httpClient: HttpClient) {
    console.log('UsuarioService.constructor()');

    this.googleInit();//cargamos la instancia de google
  }//constructor

  crearUsuario(formData: RegisterFormI) {
    console.log('UsuarioService.crearUsuario()');
    const urlAltaUsuarios = `${url}/usuarios`;
    console.log('url', urlAltaUsuarios);
    return this.httpClient.post(urlAltaUsuarios, formData).pipe(
      tap((resp: any) => {//el operador tap regresara  el mismo observable,solo ahcemos una tarea especifa extra 
        console.log(resp);
        localStorage.setItem('token', resp.token);//metemos el token al localstorage
      })
    );

  }
  /**
   * Se accede al login mediante el flujo normal
   * @param formData 
   */
  loginNormal(formData: LoginFormI) {
    console.log('UsuarioService.validaTokenAccesoNormal()', formData);
    const urlLoginUsuario = `${url}/login`;

    console.log('urlLoginUsuario', urlLoginUsuario);

    return this.httpClient.post(urlLoginUsuario, formData).pipe(
      tap((resp: any) => {//el operador tap regresara  el mismo observable,solo ahcemos una tarea especifa extra 
        console.log('respuesta ws->', resp);
        localStorage.setItem('token', resp.token);//metemos el token al localstorage
      })
    );

  }//loginNormal


  /**
   * Se accede al login con el Google
   * @param token 
   */
  loginGoogle(token: string) {
    console.log('UsuarioService.loginTokenAccesoGoogle()');
    const urlLoginGoogleUsuario = `${url}/login/google`;
    var body = {
      token: token
    };
    console.log('urlLoginGoogleUsuario', urlLoginGoogleUsuario);

    return this.httpClient.post(urlLoginGoogleUsuario, body)
      .pipe(
        tap((resp: any) => {//el operador tap regresara  el mismo observable,solo ahcemos una tarea especifa extra 
          console.log('respuesta ws->', resp);
          localStorage.setItem('token', resp.token);//metemos el token al localstorage
        })
      );

  }//loginGoogle

  /**
   * 
   * @param token Metodo creado para recibir un token generado por nuestro sistema validar y renovar el token
   */
  validarToken(): Observable<boolean> {
    console.log('UsuarioService.validarToken()');
    const token = localStorage.getItem('token') || ''
    const urlRenovarToken = `${url}/login/renovarToken`;

    const headers = new HttpHeaders({
      'x-token': token
    });
    console.log('urlRenovarToken:: ', urlRenovarToken);

    return this.httpClient.get(urlRenovarToken, { headers })
      .pipe(
        tap((resp: any) => {//el operador tap regresara  el mismo observable,solo ahcemos una tarea especifa extra 
          console.log('respuesta ws->', resp);
          localStorage.setItem('token', resp.token);//metemos el token al localstorage
        }),
        map((respuesta) => {
          return respuesta.ok;
        }),
        catchError((error) => {//obtiene el error que surga en este flujo completo
          console.log(error);
          Swal.fire({
            icon: 'error',
            text: error.error.msg,
            allowOutsideClick: false
          });
          return of(false) // se crea nuevo observable usando el of
        })
      );
  }//validarToken

  /**
   * Se crea para salir de login
   */
  logout() {
    localStorage.removeItem("token");
    //requerimos la instancia de google para llamr el signout, es por ello que se puso a este nivel de codigo la cracion de la instancia en el constructor
    this.auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  }

  googleInit(): Promise<unknown> {
    console.log("UsuarioService.googleInit()  se va a crear promesa ");
    return  new Promise((resolve) => {
      console.log('Ejecutando la promesa');
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '669489114255-jsdkjfpqqn6qlqto6qriei03of83nd4n.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
      });
     
    });
    
    
  }



}//class
