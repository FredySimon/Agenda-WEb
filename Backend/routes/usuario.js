'use strict'

var expres = require('express');
var UsuarioController = require('../controllers/usuario');

var api = expres.Router(); 

api.get('/prueba', UsuarioController.pruebaUser);
api.post('/guardar', UsuarioController.saveUser);
api.post('/nuevoContacto/:id', UsuarioController.newContact);
api.post('/eliminarContacto/:id/:idC', UsuarioController.deleteContact);
api.post('/editarContacto/:id/:idC', UsuarioController.editContact);
api.post('/login', UsuarioController.login);
api.post('/perfil', UsuarioController.getUsuario);
api.post('/searchContacts', UsuarioController.searchContacts);

module.exports = api;