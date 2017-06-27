'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "#uoi33;@6%+:?5Q";

exports.verificacionUsuario = function(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({
            message: "La petición no tiene la cabecera de autorización",
            object: null,
            response: false
        });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {

        var payload = jwt.decode(token, secret);

        if (payload.exp < moment().unix()) {
            return res.status(401).send({

                message: "El Token ha expirado, por favor autentiquese de nuevo",
                object: null,
                response: false

            });
        }

    } catch (ex) {

        console.log(ex);

        return res.status(404).send({
            message: "Token no válido",
            object: null,
            response: false
        });

    }

    req.usuario = payload;

    next();
}