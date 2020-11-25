import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable , interval, Subscription } from 'rxjs';
import { retry , map, filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {
  private subscriptionRef: Subscription;
  constructor() { }
  
  ngOnInit(): void {
    // llamada
   this.returnObservable().pipe(
    map(data => {
     // console.log('Dentro del pipe vamos a reintentar');
      retry(1);
      return data;
    })
    // retry(1)  //en caso de error se intenta una vez mas 
    ).
    subscribe(
      resp => {
      console.log('suscrito::', resp);
      },
      (error) => {
        console.error('error::', error);
      },
      () => {
         console.log('Tarea terminada::');
      }
    );

    // ejercicio dos
   this. subscriptionRef = this.retornaIntervalo().subscribe(valor => {
      console.log(valor);
    });

    }
    ngOnDestroy(): void{
      this.subscriptionRef.unsubscribe();
    }

    returnObservable(): Observable<number> {
      let count = 0;
      const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval(() => {
              count++;
              observer.next(count);
              if (count === 2){ // prueba de error
                // ahora finalizo la promesa
                observer.error('Se lanza un error en 2');
              }
              // para cancelar la funcion infinita intervalo primero hago una referencia a ella
              // const intervalo = setInterval( , luego uso el metodo de javascript ptopia
              // quiero terminar mi proceso en i=10
              if (count === 4){
                clearInterval(intervalo); // cancelo la funcion setIntervalo propia javascript
                // ahora finalizo la promesa
                observer.complete();
              }
          }, 1000);
      });
      return obs$;
    }

    retornaIntervalo(): Observable<number>{
      const intervalo$ = interval(1000).pipe(
        map(valor => {  // map adecua el valor de salida
          return valor + 1;
        }),
        filter(valor => {
          let bandera = false;
          ( valor % 2 === 0 ) ? bandera = true : bandera = false; // si no cumple no se ejecuta el take
          return bandera;  // por eso pinta log 2,4,6,8,10,12,14,16,18,20  el orden si afecta ,si pongo take antes
        } )//,
        // take(10) // take solo lanza 10 veces el proceso,
      );
      return intervalo$;
    }
}
