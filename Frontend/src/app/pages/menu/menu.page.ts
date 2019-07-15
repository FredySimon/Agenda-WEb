import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Principal',
      url: '/menu/principal',
      icon: 'home'
    },
    {
      title: 'Frameworks :)',
      children: [
        {
          title: 'Angular',
          url: '/menu/angular',
          icon: 'logo-angular'
        },
        {
          title: 'Ionic',
          url: '/menu/ionic',
          icon: 'logo-ionic'
        }
      ]
    },
    {
      title: 'Mis contactos',
      children: [
        {
          title: 'Contactos personales',
          url: '/menu/personas',
          icon: 'contact'
        }
      ]
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
