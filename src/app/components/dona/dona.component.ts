import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
   public colors: Color[] = [
    {backgroundColor:['#6857E6', '#009FEE', '#F02059']} // por cada objeto * un registro si ubiese otro **
   // {backgroundColor:['#9E120E', '#FF5800', '#FFB414']} // si ubiese otro **
   ];
   @Input() titulo: string = '';
   @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
   @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100] // *
    // [350, 450, 100] si ubiese otro **
   ];
}
