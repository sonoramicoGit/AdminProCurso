import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  public links: NodeListOf<Element> ;
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme(this.links);
  }
 changeTheme(theme: string): void{
 this.settingsService.changeTheme(theme);
 this.checkCurrentTheme(this.links);
}

 checkCurrentTheme(links: NodeListOf<Element>): void{
   this.settingsService.checkCurrentTheme(links);
 }

}
