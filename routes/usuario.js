'use strict'

var express = require("express");
var usuarioController = require("./../controllers/usuario");
var mdAuth = require("./../middlewares/autenticado");

var api = express.Router();

api.post("/user", usuarioController.crearUsuario);

module.exports = api;