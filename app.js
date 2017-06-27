'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargo las rutas con las que quiero trabajar
var usuario_routes = require("./routes/usuario");

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Allow", "GET, POST, PUT, DELETE, OPTIONS");

    next();

});

//Rutas
app.get("/", function(req, res) {
    res.status(200).send({ mensaje: "Bienvenido a mi primera API" });
});

app.use("/api", usuario_routes);

module.exports = app;