import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { NavController, ToastController,  LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'

import { ModalController } from '@ionic/angular';
import { ContactosPage } from './contactos/contactos.page';
import { RegisterPage } from '../login/register/register.page';
import { AlertController } from '@ionic/angular';
import { Contacto } from '../../models/contacto'
import { DetallePage } from './detalle/detalle.page';
import { Storage } from '@ionic/storage';
import { PerfilPage } from './perfil/perfil.page';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.page.html',
  styleUrls: ['./personas.page.scss'],
})
export class PersonasPage implements OnInit {
  personas = [];
  filtro_contacto = '';
  id : string;
  contact : string;

  constructor(
    public rest: UsuarioService,
    private route: ActivatedRoute,
    private load:LoadingController,
    private modal:ModalController,
    private nav:NavController,
    public alertController: AlertController,
    private toast: ToastController,
    private storage: Storage
    ) { 
    
    }

    
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if(this.id){
      this.getPersons();
    }
    
    this.storage.get('id').then((val) =>{
      console.log('Storage:', val)
    })
  }

  async logout(){
    const loading = await this.load.create({
      message: 'Saliendo de la cuenta...',
      duration: 3000
    });

    await loading.present();
    this.nav.navigateForward('/login')
    this.storage.clear()
  }

 async getPersons(){
    const loading = await this.load.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.rest.searchContacts(this.id).subscribe(res=>{
      loading.dismiss();
      console.log(res)
      this.personas = res.contactos.contactos;
      
    });
  }

  async perfil(){
    const modal = await this.modal.create({
      component: PerfilPage,
    });
    await modal.present();
  }

  async contactoNuevo(){
    const modal = await this.modal.create({
      component: ContactosPage,
      componentProps:{
        id: this.id,
      }
    });
    modal.onDidDismiss().then(res => {
      this.getPersons();
    });
    await modal.present();
  }

  async confirmarDelete(_id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Quieres eliminar el contacto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
         handler: () => {
            console.log('Confirm Okay');
            this.contact = _id
            this.eliminarContacto();
            this.getPersons();
          }
        }
      ]
    });
    await alert.present();  
  }

  async eliminarContacto(){
    this.rest.deleteContacto(this.id, this.contact).subscribe(res => {
      console.log(res)
      this.contactoEliminado()
    })
  }

  async contactoEliminado(){
    const toast = await this.toast.create({
      color: 'dark',
      duration: 2000,
      message: 'Contacto eliminado satisfactoriamente.',
      animated:true,
      showCloseButton: true,
      closeButtonText: 'X', 
      position: 'bottom',
      cssClass: 'toasteliminar',
      mode: "ios",
    })
    toast.present();
    toast.onDidDismiss().then((val) => {
      console.log('cerrar')
    })
  }

  async editarContacto(contacto: Contacto){
    const modal = await this.modal.create({
      component: ContactosPage,
      componentProps:{
        id: this.id,
        idC: contacto._id,
        contacto: contacto,  
      }
    });
    modal.onDidDismiss().then(res => {
      this.getPersons();
    });
    await modal.present();
    
  }

  async obtenerContacto(contacto: Contacto) {
    const modal = await this.modal.create({
      component: DetallePage,
      cssClass: 'ajustes',
      componentProps:{
        data1: contacto.nombre,
        data2: contacto.direccion,
        data3: contacto.correo,
        data4: contacto.fecha_nacimiento,
        data5: contacto.celulares
      }
    })
    await modal.present()
  }

  buscarContacto(event){
    const texto = event.target.value
    this.filtro_contacto = texto
    console.log(texto)
  }

}
