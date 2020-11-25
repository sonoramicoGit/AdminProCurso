import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Data, Router } from '@angular/router';
import { retry , map, filter, take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrubs',
  templateUrl: './breadcrubs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {
  public titulo: string;
  titulosSub$: Subscription;
  constructor(private router: Router) {
  console.log('BreadcrumbsComponent.constructor()');
  this.titulosSub$ =   this.getDataRuta().subscribe(({titulo}) => {
  this.titulo = titulo;
  document.title = `AdminPro - ${titulo}`;
    });
  }

  gnOnDestroy(): void{
    this.titulosSub$.unsubscribe();
  }
  getDataRuta(): Observable<Data>{
    const intervalo$ = this.router.events
    .pipe(
      filter(event =>  event instanceof ActivationEnd),
      filter((event: ActivationEnd) =>  event.snapshot.firstChild === null),
      map((event: ActivationEnd) => {
        return event.snapshot.data;
      })
    );
    return intervalo$;
  }
 
}
