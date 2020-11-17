import { Component, OnInit } from '@angular/core';
import { MultiDataSet, Label,Color } from 'ng2-charts';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {
  public labels1: Label[] = ['Carros', 'Motos', 'Bicicletas'];
  public data1: MultiDataSet = [
    [200, 200, 200] // *
    // [350, 450, 100] si ubiese otro **
   ];
   public colors: Color[] = [
    {backgroundColor:['#6857E6', '#009FEE', '#F02059']} // por cada objeto * un registro si ubiese otro **
   // {backgroundColor:['#9E120E', '#FF5800', '#FFB414']} // si ubiese otro **
   ];
}
