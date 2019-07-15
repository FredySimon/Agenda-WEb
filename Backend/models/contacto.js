'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactoSchema = Schema({
    nombre: {type: String, uppercase : true},
    fecha_nacimiento: String,
    correo: {type: String, lowercase : true},
    direccion: String,
    celulares: { type: Array, required: true },
}); 

module.exports = mongoose.model('Contacto', ContactoSchema)