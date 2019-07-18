import { Component, OnInit, Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsuarioService } from '../../../services/usuarios/usuario.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  id : string = '';

  nombre: string = ''; 
  correo: string = ''; 
  password: string = '';
  celulares = []; 
  contactos = Number;

  @Input() data: any;

  constructor(private modalCtrl: ModalController, private storage: Storage, private rest: UsuarioService, private route: ActivatedRoute,) { }

  ngOnInit() {
     this.storage.get('id').then((val) =>{
      console.log('Storage:', val)
      this.id = val
      console.log(this.id)

    }) 
    
  }

  async close(){
    await this.modalCtrl.dismiss();
  }

  traerInformacion(){
    this.rest.perfilUsuario(this.id).subscribe(res=>{
      console.log(res)
      this.nombre = res.usuario.nombre;
      this.correo = res.usuario.correo;
      this.password = res.usuario.password;
      this.celulares = res.usuario.celulares;
      this.contactos = res.usuario.contactos.length;
    }, (err) => {
      console.log(<any>err) 
  })

}
}
