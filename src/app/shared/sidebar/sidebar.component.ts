import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  constructor(private sidebarService: SidebarService) {
    console.log('SidebarComponent.contructor()');
    this.menuItems = sidebarService.menu;
    console.log('menuItems:', this.menuItems);
  }

  ngOnInit(): void {
  }

}
