'use strict'

var expres = require('express');
var UsuarioController = require('../controllers/usuario');

var api = expres.Router(); 

api.get('/prueba', UsuarioController.pruebaUser);
api.post('/guardar', UsuarioController.saveUser);
api.post('/nuevoContacto', UsuarioController.newContact);
api.post('/eliminarContacto', UsuarioController.deleteContact);
api.post('/login', UsuarioController.login);
api.get('/logout', UsuarioController.logout);
api.post('/searchContacts', UsuarioController.searchContacts);

module.exports = api;