import { Pipe, PipeTransform } from '@angular/core';
import { Contacto } from '../models/contacto';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(contactos: Contacto[], texto: string): Contacto[]{
    if(texto.length === 0) { return contactos; }

    texto = texto.toLocaleLowerCase();

   return contactos.filter( contacto =>{
      return contacto.nombre.toLocaleLowerCase().includes(texto) || contacto.correo.toLocaleLowerCase().includes(texto)
    });
  }

}
