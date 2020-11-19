import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme =  document.querySelector('#theme');

  constructor() {
    console.log('SettingsService.contructor()');
    const theme = localStorage.getItem('theme');
    this.linkTheme.setAttribute('href', theme);
   }

   changeTheme(theme: string): void{
    console.log('SettingsService.changeTheme()');
    const newTheme = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', newTheme);
    localStorage.setItem('theme', newTheme);
 }
 checkCurrentTheme(links: NodeListOf<Element>): void{
    links = document.querySelectorAll('.selector');
    links.forEach(elem => {
    elem.classList.remove('working');
    const btnTheme = elem.getAttribute('data-theme');
    const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
    const currentTheme =  this.linkTheme.getAttribute('href');
    if (btnThemeUrl === currentTheme){
      elem.classList.add('working');
    }

  });
}

}
