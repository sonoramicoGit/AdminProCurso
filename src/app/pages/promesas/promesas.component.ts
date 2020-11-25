import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  const promesa = new Promise( (resolve, reject) => {
  const exito = true;
  if (exito){
      resolve('Se ejecuto con exito el insert BD');
  }else{
      reject('Error inesperado insert BD');
  }
  });

  promesa.then( (mensaje) => {
        console.log('Exito promesa::', mensaje);
  }).catch((error) => {
        console.log('Error promesa::', error);
  });
  console.log('fin del init');
  // this.getUsuarios(); // llamando la otra forma
  this.getUsuarios().then(usuario => {
    console.log('Exito consulta usuarios::', usuario);
  });
  }

  // ora forma de trabajar cn las promesas mas real
  getUsuarios(): Promise<unknown>{
    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp =>  resp.json())  // este metodo me regresa otra promesa por lo que
      .then(resp2 => resolve(resp2.data)); // la respuesta de la promesa sera la resp2 que es otra promesa
    });
    return promesa;
  }

}
