export class Usuario {
    constructor(
        public _id: string,
        public nombre: string,
        public correo: string,
        public password: string,
        public celulares: Number[],
        public contactos: [],
    ){

    }
}