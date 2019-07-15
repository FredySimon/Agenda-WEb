import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { PersonasPage } from '../personas.page';
import { Contacto } from '../../../models/contacto';
import { UsuarioService } from '../../../services/usuarios/usuario.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  contacto: Contacto = new Contacto ('', '', '', '', [])

  public usuarioLogueado: String = '';

  public celularInput: Number = null;
  public celularArray: Number[] = [];

  @Input() data: any;

  constructor(private modal: ModalController, public usuarioService: UsuarioService) {
    this.celularArray = [];
   }

  ngOnInit() {
  }

  async close(){
    await this.modal.dismiss();
  }

  nuevoContacto(form: NgForm){
    if(form.valid){
      if(this.celularArray.length > 0){
        this.usuarioService.postContacto(this.contacto, this.usuarioLogueado).subscribe(res =>{
          if(res.contactSave && res.contactSave._id){
            this.celularArray = []
            this.contacto;
            this.close();
           
          }else{
            console.log("No se puede registrar");

          }
        }, (err) => {
          console.log(<any>err)
        })
      } else {
        console.log('Mínimo 1 celular.')
      }
    } else {
      console.log('Introduzca los campos requeridos.')
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
          this.contacto.celulares.push(this.celularInput)
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

}
