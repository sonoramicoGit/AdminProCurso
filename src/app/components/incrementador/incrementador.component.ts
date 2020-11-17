import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent  {

  @Input('valorInicial')  progreso = 80;
  @Input() classButton = 'btn btn-primary';
@Output() incrementaPorcentaje: EventEmitter<number> = new EventEmitter();

  // Cambia el valor del porcentaje
  cambiarValor(valor: number): void{
    if (this.progreso >= 100 && valor > 0){
      this.progreso = 100;
      this.incrementaPorcentaje.emit(this.progreso);
      return;
    }
    if (this.progreso <= 0 && valor < 0){
      this.progreso = 0;
      this.incrementaPorcentaje.emit(this.progreso);
      return;
    }
    this.progreso = this.progreso + valor;
    this.incrementaPorcentaje.emit(this.progreso);

  }

  onChange(valor: number): void{
    if (valor >= 100){
      this.progreso = 100;
     }
    if ( valor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = valor;
    }
    this.incrementaPorcentaje.emit(this.progreso);

  }

}
