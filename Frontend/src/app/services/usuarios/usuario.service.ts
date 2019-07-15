import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario';
import { Contacto } from '../../models/contacto';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  selectedUsuario:Usuario;

  endpoint = 'http://localhost:3000/usuario/';
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };


  constructor(private http:HttpClient) { 
    this.selectedUsuario = new Usuario('', '', '', '', [], []);
  }

  private extractData(res){
    let body = res;
    return body || [] || {};
  }

  login(correo, password):Observable<any>{
    return this.http.post(this.endpoint + 'login', {correo: correo, password: password}, this.httpOptions).pipe(map(this.extractData));
  }

  searchContacts(id){
    return this.http.post(this.endpoint + 'searchContacts', {id: id}, this.httpOptions).pipe(map(this.extractData));
  }

postUsuario(usuario: Usuario):Observable<any>{
  let params = JSON.stringify(usuario)
  return this.http.post(this.endpoint + 'guardar', params, this.httpOptions).pipe(map(this.extractData))
}

postContacto(contacto: Contacto, id):Observable<any>{
  let params = JSON.stringify(contacto)
  return this.http.post(this.endpoint + 'nuevoContacto', params + {id: id}, this.httpOptions).pipe(map(this.extractData))
}

}
