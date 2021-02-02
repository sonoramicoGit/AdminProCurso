import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,private router :Router) { }

  ngOnInit(): void {
  }

  logout(){
    console.log("HeaderComponent.logout()");
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');//aqui no uso ngZone ya uqe la anvegacion la hice con el codigo de angualr y no dentro del codigo de google
  }

}
