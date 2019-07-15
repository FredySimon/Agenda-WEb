import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PersonasPage } from './personas.page';
import { ContactosPage } from './contactos/contactos.page';
import { ContactosPageModule } from './contactos/contactos.module';

const routes: Routes = [
  {
    path: '',
    component: PersonasPage
  }
];

@NgModule({
  entryComponents: [
    ContactosPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ContactosPageModule
  ],
  declarations: [PersonasPage]
})
export class PersonasPageModule {}
