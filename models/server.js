require('dotenv').config();
const express = require('express');
const dbConnection = require('../database/connection')

const port = process.env.port;
class Server {

    constructor() {
        this.app  = express();
        this.port = port;
        this.usuariosPath = '/users';

        //Conectar a DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.usuariosPath, require('../models/user'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;