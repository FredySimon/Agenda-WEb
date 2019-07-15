'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Password'

exports.creaateTokenUser = function(user){
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        correo:user.correo,
        contraseña: user.contraseña,
        celulares: user.celulares,
        contactos: user.contactos,
        iat: moment().unix(),
        exp: moment().add(3, 'hour').unix
    };
    return jwt.encode(payload, secret);
}