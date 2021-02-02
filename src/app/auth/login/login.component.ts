import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'; // manejo de los mensajes de error con sweetalert


declare const gapi: any;// se define la constante usada en funcion renderButton  google login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService,private ngZone:NgZone) {

  }

  public formSubmitted = false;
  public loginForm = this.formBuilder.group({
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required]],
    remember: [false],

  }, {
    //validators: this.passwordNoIguales('password', 'password2')
  })
  public auth2: any;//manejo de login google

  ngOnInit(): void {
    this.obtenerValoresStorage();
    this.renderButton();//renderisamos el boton google login
  }

  login(): void {
    console.log('LoginComponent.login()');
    console.log(this.loginForm.value);
    this.recordarCorreo(this.loginForm);
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      console.log('Invalido el proceso--->');
      return;

    }
    //validando token
    this.usuarioService.loginNormal(this.loginForm.value).subscribe(resp => {
      //el seteo del token dentron del localstorage lo realizamos en el service si es exitoso

      //navegar al dashboard normal
      this.router.navigateByUrl('/');
    }, (respError: any) => {
      // Error en el proceso
      console.log(respError);
      const msgError = respError.error.msg;
      Swal.fire({
        icon: 'error',
        text: msgError,
        allowOutsideClick: false
      });

    })

  }//login
  /**
   * Metodo creado para guardar el email en el local storage
   * @param forma 
   */
  recordarCorreo(forma: FormGroup): void {
    const email = forma.get('email').value;
    const remember = forma.get('remember').value;
    if (remember) {
      console.log('salvando email en localstorage', email);
      localStorage.setItem('email', email);//metemos el email al localstorage
    } else {
      console.log('removiendo email en localstorage', email);
      localStorage.removeItem('email');//quitamos el email al localstorage
    }
  }

  obtenerValoresStorage() {

    this.loginForm.get('email').setValue(localStorage.getItem('email') || '');//sacamos el email del localstorage si noexiste un string vacio
  }

  campoInvalido(valor: string): boolean {

    if (this.loginForm.get(valor).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }//campoInvalido



  //se borraran las funciones onSuccess onFailure
  /**
   * 
   * @param googleUser Manejo de Login google
   */
  /*  onSuccess(googleUser) {
     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
     console.log('token',id_token);
   }
   onFailure(error) {
     console.log(error);
   } */

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // 'onsuccess': this.onSuccess,
      //'onfailure': this.onFailure
    });
    this.startApp();
  }
 async startApp() {//la hago asyn para esperar a que se ejecute la promesa asincrona del metodo googleInit
   /*  gapi.load('auth2', () => {  
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '669489114255-jsdkjfpqqn6qlqto6qriei03of83nd4n.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
       this.attachSignin(document.getElementById('my-signin2'));//boton   que creamos en el login.html social
     
    }); */
              //Sustituyo por la promesa
    await this.usuarioService.googleInit();//espero a que se ejecute
    this.auth2=this.usuarioService.auth2;//inicializamos la variable utilizando la del service ya que se elimino de ese flujo
    this.attachSignin(document.getElementById('my-signin2'));//boton   que creamos en el login.html social
    
  };

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        // document.getElementById('name').innerText = "Signed in: " +
        //   googleUser.getBasicProfile().getName();
        const id_token = googleUser.getAuthResponse().id_token;//obtenemos token
        console.log(id_token);
        this.usuarioService.loginGoogle(id_token).subscribe(resp => {
          //el seteo del token dentron del localstorage lo realizamos en el service si es exitoso
          //navegar al dashboard google
          this.ngZone.run(()=>{//esto se utiliza para cuando se navega a paginas propias del sistema  con aplicaciones que son ajenas a angular (google)
            this.router.navigateByUrl('/');
          });
          
        }, (respError: any) => {
          // Error en el proceso
          console.log(respError);
          const msgError = respError.error.msg;
          Swal.fire({
            icon: 'error',
            text: msgError,
            allowOutsideClick: false
          });

        });

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}//class
