'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: {type: String, uppercase : true},
    correo: {type: String, lowercase : true},
    password: String,
    celulares: { type: Array, required: true },
    contactos: { type: Array, required: false },
})

module.exports = mongoose.model('Usuario', UsuarioSchema);