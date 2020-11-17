import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'
  ]
})
export class ProgressComponent {
  constructor() { }
progreso1 = 25;
progreso2 = 35;

  get getPorcentaje1(): string{
    return `${this.progreso1}%`;
  }
  get getPorcentaje2(): string{
    return `${this.progreso2}%`;
  }
 }
