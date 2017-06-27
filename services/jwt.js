'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "#uoi33;@6%+:?5Q";

exports.createToken = function(usuario) {

    var payload = {

        sub: usuario.id,
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix

    };

    return jwt.encode(payload, secret);

}