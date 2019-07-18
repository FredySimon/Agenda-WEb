export class Contacto {
    constructor(
        public _id: string,
        public nombre: string,
        public fecha_nacimiento: string,
        public correo: string,
        public direccion: string,
        public celulares: Number[]   
    ){

    }
}