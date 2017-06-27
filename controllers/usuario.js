'use strict'

var bcrypt = require('bcrypt-nodejs');
var db = require("./../util/database.js");
var jwt = require("./../services/jwt");

function crearUsuario(req, res) {

    var params = req.body;

    var mensaje = "";
    var esValido = true;

    //validar los datos del usuario
    if (params.nombre == "" || params.nombre == null || params.nombre == "undefined") {
        mensaje += "El campo nombre es requerido";
        esValido = false;
    }

    //resto de campos - validar un email, como validar una contraseña fuerte
    //Expresiones regulares

    if (esValido == false) {
        return res.status(422).send({
            message: mensaje,
            object: null,
            response: false
        })
    };

    var usuario = {
        nombre: params.nombre,
        apellido: params.apellido,
        email: params.email,
        usuario: params.usuario,
        rol: 2
    };

    bcrypt.hash(params.contrasena, null, null, function(error, hash) {

        if (error) {
            return res.status(500).send({
                message: "Ocurrio un error al guardar la información",
                object: null,
                response: false
            });
        }

        usuario.contrasena = hash;

    });

    var pool = db.getPool();

    pool.getConnection(function(error, connection) {

        if (error) {
            return res.status(500).send({
                message: "Ocurrio un error al intentar conectarse a la base de datos",
                object: null,
                response: false
            });
        } else {

            connection.query("INSERT INTO tbl_usuario SET ?", usuario, function(error, result) {

                connection.release();

                if (error) {

                    return res.status(500).send({
                        message: "Ocurrio un error al guardar el usuario.",
                        object: null,
                        response: false
                    });

                } else {

                    usuario.id = result.insertId;

                    res.status(200).send({

                        message: "Usuario guardado correctamente",
                        object: usuario,
                        response: true

                    });

                }

            });
        }

    });
}

function saludar() {
    console.log("Hola mundo!!");
}

module.exports = {
    crearUsuario,
    saludar
}