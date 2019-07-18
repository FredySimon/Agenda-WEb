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
    var idUser = req.params.id

    if(params.nombre ){
        contact.nombre = params.nombre;
        contact.fecha_nacimiento = params.fecha_nacimiento;
        contact.correo = params.correo;
        contact.direccion = params.direccion;
        contact.celulares = params.celulares;

        Usuario.findByIdAndUpdate(idUser, {$push:{contactos: contact}}, {new: true}, (err, contactSave) => {
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
    var id = req.params.id;
    var idContact = req.params.idC;

    if(id && idContact){
       Usuario.findById(id, (err, usuario) => {
           if(err){
               res.status(500).send({message: 'Error general'})
           } else {
               if(!usuario){
                res.status(500).send({message: 'Error al eliminar'});
               } else {
                   var contactos = usuario.contactos;
                   for(let index = 0; index < contactos.length; index++){
                       if(contactos[index]._id == idContact){
                           contactos.splice(index, 1);
                           break;
                       }
                   }

                   Usuario.findByIdAndUpdate(id, {contactos: contactos}, {new: true}, (err, contactDelete) => {
                       if(err){
                        res.status(500).send({ message: "Error al eliminar." });
                       } else {
                           if(!contactDelete){
                            res.status(500).send({ message: "No se ha podido eliminar" });
                           } else {
                            res.status(200).send({ contactDelete });
                           }
                       }
                   })
               }
           }
       })
    } else {
        res.status(200).send({message: 'Solicitud sin parametros necesarios.'});
    }
}

function editContact(req, res){
    var id = req.params.id;
    var idContact = req.params.idC;
    var params = req.body;

    if(id && idContact){
        Usuario.findById(id, (err, usuario) =>{
            if(err){
                res.status(500).send({message: "Error general"})
            } else {
                if(!usuario){
                    res.status(404).send({ message: "No existe este usuario." });
                } else {
                    var contactos = usuario.contactos;
                    for (let index = 0; index < contactos.length; index++){
                        if(contactos[index]._id == idContact){
                            contactos[index].nombre = params.nombre;
                            contactos[index].fecha_nacimiento = params.fecha_nacimiento;
                            contactos[index].correo = params.correo;
                            contactos[index].direccion = params.direccion;
                            contactos[index].celulares = params.celulares;
                            break;
                        }
                    }
                    Usuario.findByIdAndUpdate(id, {contactos: contactos}, {new: true}, (err, contactUpdate) => {
                        if(err){
                         res.status(500).send({ message: "Error general." });
                        } else {
                            if(!contactUpdate){
                             res.status(500).send({ message: "No se ha podido actualizar" });
                            } else {
                             res.status(200).send({ contactUpdate });
                            }
                        }
                    });
                }
            }
        });
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

function getUsuario(req, res){
    var params = req.body;
    var userId = params.id;
    if(userId){
        Usuario.findById(userId, (err, usuario)=> {
            if(err){
                res.status(500).send({message: 'Error general'});
            }else{
                if(!usuario){
                    res.status(500).send({message: 'Usuario inexistente'});
                } else {
                    res.status(200).send({usuario});
                }
            }
        })
    }
}

module.exports = {
    pruebaUser,
    saveUser,
    newContact,
    deleteContact,
    editContact,
    login,
    logout,
    searchContacts,
    getUsuario,
}