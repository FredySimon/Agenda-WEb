import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { NgForm } from '@angular/forms';

import { PersonasPage } from '../personas.page';
import { Contacto } from '../../../models/contacto';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  contacto: Contacto = new Contacto ('', '', '', '', '', [])
  id:string
  idC:string

  public celularInput: Number = null;
  public celularArray: Number[] = [];

  @Input() data: any;

  constructor(private modal: ModalController, public usuarioService: UsuarioService, private route: ActivatedRoute, private toast: ToastController, private navParams: NavParams, private storage: Storage) {
    this.celularArray = [];
    this.id = this.navParams.get('id');
  
   }

  ngOnInit() {
    this.contacto._id = this.idC
    console.log(this.contacto._id)
  
    this.storage.get('id').then((val) =>{
      console.log('Storage:', val)
    })

    if(this.contacto._id !== ''){
      this.celularArray = this.contacto.celulares
    }
  }

  async close(){
    await this.modal.dismiss();
  }

  nuevoContacto(form: NgForm){
    if(form.valid){
      if(form.value._id){
        if(this.contacto.celulares.length > 0){
          this.usuarioService.editContacto(this.id, this.idC, this.contacto ).subscribe(res =>{
            if(res.contactUpdate){
              this.celularArray = []
              this.contacto;
              this.close();
              this.contactoGuardado()
            } else {
              console.log("No se puede registrar");
              this.falloAlGuardar()
            }
          }, (err) => {
            console.log(<any>err)
          this.falloAlGuardar()
          })
        } else {
          console.log('Mínimo 1 celular.')
        this.minimoCelulares()
        }
      } else {
        if(this.celularArray.length > 0){
          this.usuarioService.postContacto(this.contacto, this.id).subscribe(res =>{
            if(res.contactSave && res.contactSave._id){
              this.celularArray = []
              this.contacto;
              this.close();
             this.contactoGuardado()
            }else{
              console.log("No se puede registrar");
              this.falloAlGuardar()
            }
          }, (err) => {
            console.log(<any>err)
            this.falloAlGuardar()
          })
        } else {
          console.log('Mínimo 1 celular.')
          this.minimoCelulares()
        }
      }
    } else {
      console.log('Introduzca los campos requeridos.')
      this.camposRequeridos()
    }
  }

  addPhone(){
    if(this.celularInput !== null){
      if (this.celularInput > 11111111 && this.celularInput < 99999999) {
      if(this.celularArray.length < 5){
        if(this.celularArray.indexOf(this.celularInput) > -1){
          console.log('Número telefónico duplicado')
        }else{
          this.celularArray.push(this.celularInput)
          this.contacto.celulares === this.celularArray;
          console.log(this.celularArray)
          console.log(this.contacto.celulares)
          this.celularInput = null;
          console.log('Teléfono agregado')
        }
      }else{
        console.log('Máximo 5 celulares')
      }
      } else {
        console.log('Celular invalido.')
      }
      
    }else{
      console.log('Ingrese un celular.')
    }
  }

  remove(phone): void {
    const index = this.celularArray.indexOf(phone);

    if (index >= 0) {
      this.celularArray.splice(index, 1);
      this.contacto.celulares === this.celularArray
      console.log('removido')
    }
  }

  async contactoGuardado(){
    const toast = await this.toast.create({
      color: 'dark',
      duration: 2000,
      message: 'Contacto guardado exitosamente.',
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

  async falloAlGuardar(){
    const toast = await this.toast.create({
      color: 'dark',
      duration: 2000,
      message: 'No se puede registrar.',
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

  async minimoCelulares(){
    const toast = await this.toast.create({
      color: 'dark',
      duration: 2000,
      message: 'Mínimo 1 celular.',
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

  async camposRequeridos(){
    const toast = await this.toast.create({
      color: 'dark',
      duration: 2000,
      message: 'Introduzca los campos requeridos.',
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



}
