import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { ToastController } from '@ionic/angular';

import { RegisterPage } from './register/register.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo;
  password;

  constructor(
    private restU:UsuarioService,
    private nav:NavController,
    public modal: ModalController,
    private loading:LoadingController, 
    private toast: ToastController
    ) { }

  ngOnInit() {
  }

  async login(){
    const loading = await this.loading.create({
      message: 'Ingresando...'
    });

    await loading.present();
    this.restU.login(this.correo,this.password).subscribe((res)=>{
      this.correo = ''
      this.password = ''
      loading.dismiss();
      let usuarioId = res.user._id;
      this.nav.navigateForward('/menu/personas/'+usuarioId)
      this.messageLogin()
    }, (err) => {
      console.log(<any>err)
      loading.dismiss();
      this.errorLogin()
    });

  }

  async register(){
    const modal = await this.modal.create({
      component: RegisterPage
    })
    await modal.present();
  }

  async errorLogin(){
    const toast = await this.toast.create({
      color: 'dark',
      duration: 3000,
      message: 'Error al intentar ingresar a su cuenta.',
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

  async messageLogin(){
    const toast = await this.toast.create({
      color: 'dark',
      duration: 3000,
      message: 'Ingreso a su cuenta exitosamente.',
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
