import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'

import { ModalController } from '@ionic/angular';
import { ContactosPage } from './contactos/contactos.page';
import { RegisterPage } from '../login/register/register.page';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.page.html',
  styleUrls: ['./personas.page.scss'],
})
export class PersonasPage implements OnInit {
  personas = [];
  IdUsuario = null;

  constructor(
    public rest: UsuarioService,
    private route: ActivatedRoute,
    private load:LoadingController,
    private modal:ModalController,
    private nav:NavController,
    ) { }

    
  ngOnInit() {
    this.IdUsuario = this.route.snapshot.params['id'];
    if(this.IdUsuario){
      this.getPersons();
    }
    
  }

  async logout(){
    const loading = await this.load.create({
      message: 'Saliendo de la cuenta...',
      duration: 3000
    });

    await loading.present();
    this.nav.navigateForward('/login')
  }

 async getPersons(){
    const loading = await this.load.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.rest.searchContacts(this.IdUsuario).subscribe(res=>{
      loading.dismiss();
      console.log(res)
      this.personas = res.contactos.contactos;
      
    });
  }

  async contactoNuevo(){
    const modal = await this.modal.create({
      component: ContactosPage,
      componentProps:{
        _id: this.IdUsuario,
      }
    })
    await modal.present();
  }

}
