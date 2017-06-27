'use strict'

var mysql = require("mysql");

var pool;

module.exports = {

    getPool: function() {

        //Singleton
        if (pool) return pool;

        pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "eventos_sena"

        });

        return pool;

    }

}