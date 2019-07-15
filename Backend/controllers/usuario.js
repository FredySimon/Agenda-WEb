'use strict'

var Usuario = require('../models/usuario');
var Contacto = require('../models/contacto');

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt.js');

function pruebaUser(req, res){
    res.status(200).send({message: 'Usuario esta corriendo'})
}

function saveUser(req, res){
    var usuario = new Usuario();
    var params = req.body;

    if(params.nombre && params.correo && params.password){
        usuario.nombre = params.nombre;
        usuario.correo = params.correo;
        usuario.password = params.password;
        usuario.celulares = params.celulares;
        usuario.contactos = params.contactos;

        Usuario.findOne({correo: usuario.correo.toLowerCase()}, (err, issetUser)=>{
            if(err){
                res.status(500).send({message: 'Error, el usuario ya existe.'});
            } else {
                if(!issetUser){
                    bcrypt.hash(params.password, null, null, function(err, hash){
                        usuario.password = hash;

                        usuario.save((err, usuarioSave)=>{
                            if(err){
                                res.status(500).send({message: 'Error general al guardar'});
                            }else{
                                if(!usuarioSave){
                                    res.status(500).send({message: 'Error al guardar'});
                                }else{
                                    res.status(200).send({usuarioSave});
                                }
                            }
                        })
                    })
                } else{
                    res.status(200).send({ message: 'El usuario no se puede registrar.'});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Solicitud sin parametros requeridos'});
    }
}

function newContact(req, res){
    var contact = new Contacto();
    var params = req.body;

    if(contact && params._id){
        contact.nombre = params.nombre;
        contact.fecha_nacimiento = params.fecha_nacimiento;
        contact.correo = params.correo;
        contact.direccion = params.direccion;
        contact.celulares = params.celulares;

        Usuario.findByIdAndUpdate({_id: params._id}, {$push:{contactos: contact}}, {new: true}, (err, contactSave) => {
            if(err){
                res.status(500).send({message: 'Error general al guardar.'});
            } else {
                if(!contactSave){
                    res.status(500).send({message: 'Error al guardar'});
                } else {
                    res.status(200).send({contactSave});
                }
            }
        })
    } else {
        res.status(200).send({message: 'Solicitud sin parametros necesarios.'});
    }
}

function deleteContact(req, res){
    var contact = new Contacto();
    var params = req.body;

    if(params._id && contact){
        contact = params.contacID;

        Usuario.findByIdAndUpdate({_id: params._id}, {$splice:{contact: contact}}, {new:true}, (err, contactDelete) => {
            if(err){
                res.status(500).send({message: 'Error general al eliminar.'});
                console.log(err)
            } else {
                if(!contactDelete){
                    res.status(500).send({message: 'Error al eliminar'});
                } else {
                    res.status(200).send({ message: 'Removed.' });
                }
            }
        })
    } else {
        res.status(200).send({message: 'Solicitud sin parametros necesarios.'});
    }
}

function login(req, res){
    var params = req.body
    var correo = params.correo;
    var password = params.password;

    if(correo && password){
        Usuario.findOne({correo: correo.toLowerCase()}, (err, user)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else{
                if(user){
                    bcrypt.compare(password, user.password, (err, check)=>{
                        if(check){
                            if(params.gettoken){
                                res.status(200).send({token: jwt.creaateTokenUser(user)});
                            } else {
                                res.status(200).send({user: user})
                            }
                        } else {
                            res.status(404).send({message: 'El usuario no pudo iniciar sesión correctamente.'})
                        }
                    })
                }else{
                    res.status(404).send({message: 'El usuario no existe.'});
                }
            }
        });
    }else{
        res.status(500).send({message: 'Solicitud sin parametros necesarios'});
    }
}

function logout(req, res){
    
}

function searchContacts(req, res){
    var params = req.body;
    var userId = params.id;

    if(userId){
        Usuario.findOne({_id: userId}, (err, contactos)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else{
                if(!contactos){
                    res.status(500).send({message: 'Usuario inexistente'});
                }else{
                    res.status(200).send({contactos});
                }
            }
        });
    }else{
        res.status(404).send({message: 'Solicitud sin parámetros necesarios'});
    }
    
}

// function searchCelulares(req, res){
//     var params = req.body;
//     var contactId = params.id;

//     if(contactId){
//         Usuario.findOne({_id: userId}, (err, contacto)=>{
// if(err)
//         })
//     }
// }

module.exports = {
    pruebaUser,
    saveUser,
    newContact,
    deleteContact,
    login,
    logout,
    searchContacts
}