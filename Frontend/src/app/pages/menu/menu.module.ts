import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/principal',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'principal', loadChildren: '../principal/principal.module#PrincipalPageModule'},
      { path: 'angular', loadChildren: '../angular/angular.module#AngularPageModule'},
      { path: 'ionic', loadChildren: '../ionic/ionic.module#IonicPageModule'},
      { path: 'personas/:id', loadChildren: '../personas/personas.module#PersonasPageModule'}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
