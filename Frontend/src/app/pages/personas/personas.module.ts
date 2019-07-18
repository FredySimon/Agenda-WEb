import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PersonasPage } from './personas.page';
import { ContactosPage } from './contactos/contactos.page';
import { ContactosPageModule } from './contactos/contactos.module';
import { DetallePage } from './detalle/detalle.page';
import {DetallePageModule  } from './detalle/detalle.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PerfilPage } from './perfil/perfil.page';
import { PerfilPageModule } from './perfil/perfil.module';


const routes: Routes = [
  {
    path: '',
    component: PersonasPage
  }
];

@NgModule({
  entryComponents: [
    ContactosPage,
    DetallePage,
    PerfilPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ContactosPageModule,
    DetallePageModule,
    PerfilPageModule,
    PipesModule,
  ],
  declarations: [PersonasPage, ]
})
export class PersonasPageModule {}
