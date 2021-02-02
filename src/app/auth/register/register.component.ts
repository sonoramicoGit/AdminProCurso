import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'; // manejo de los mensajes de error con sweetalert
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent {



  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService,private router:Router) {
    console.log('RegisterComponent.constructor()');
  }
  public formSubmitted = false;
  public registerForm = this.formBuilder.group({
    nombre: ['test', [Validators.required, Validators.minLength(3)]],
    email: ['test@gmail.com', [Validators.required, Validators.email]],
    password: ['112358', [Validators.required]],
    password2: ['112358', [Validators.required]],
    terminos: [true, [Validators.required]],

  }, {
    validators: this.passwordNoIguales('password', 'password2')
  })

  crearUsuario(): void {
    console.log('Inicia,RegisterComponent.crearUsuario()');
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid || !this.registerForm.get('terminos').value) {
      console.log('Invalido el proceso--->');
      return;

    }
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(resp => {
      console.log(resp);
      console.log(resp['token']);
            //navegar al dashboard normal
            this.router.navigateByUrl('/');
    }, (resp) => {
      // Error en el proceso
      Swal.fire({
        icon: 'error',
        text: resp.error.msg,
        allowOutsideClick: false
      });
    })
    console.log('Fin,RegisterComponent.crearUsuario()');

  }

  campoInvalido(valor: string): boolean {

    if (this.registerForm.get(valor).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }//campoInvalido

  aceptaTerminosInvalido(): boolean {
    if (!this.registerForm.get('terminos').value && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }//aceptaTerminosInvalido

  cotrasenasNoIguales(pass1: string, pass2: string): boolean {
    const passw1 = this.registerForm.get(pass1).value;
    const passw2 = this.registerForm.get(pass2).value;
    if (passw1 != passw2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }//aceptaTerminosInvalido


  passwordNoIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const valorPass1 = formGroup.get(pass1).value;
      const valorPass2 = formGroup.get(pass2).value;
      const controlPass2 = formGroup.get(pass2);
      if (valorPass1 == valorPass2) {
        controlPass2.setErrors(null);
      } else {
        controlPass2.setErrors({
          noEsIgual: true
        });
      }
    }
  }//passwordNoIguales
}//class

