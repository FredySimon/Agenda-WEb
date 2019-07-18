import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController} from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { LoginPage } from '../login.page';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario: Usuario = new Usuario('', '', '', '', [], []) 

  public celularInput: Number = null;
  public celularArray: Number[] = [];

  @Input() data: any;

  constructor(private modal: ModalController, public usuarioService: UsuarioService, private toast: ToastController) { 
    this.celularArray = [];
  }

  ngOnInit() {
  }

  async close(){
    await this.modal.dismiss();
  }

  nuevoUsuario(form: NgForm){
    if(form.valid){
      if(this.usuario.celulares.length > 0){
        this.usuarioService.postUsuario(this.usuario).subscribe(res => {
          if(res.usuarioSave && res.usuarioSave._id){
            this.contactoGuardado();
            this.celularArray = []
            this.usuario; 
            this.close();
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
          this.usuario.celulares.push(this.celularInput)
          console.log(this.celularArray)
          console.log(this.usuario.celulares)
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
      this.usuario.celulares === this.celularArray
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
