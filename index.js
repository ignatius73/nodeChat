import { createServer } from 'http';
import express from 'express';
import server from './sockets/sockets.js';


const app = express()

const httpServer = createServer(app)

server(httpServer);

app.use(express.static('public'))

httpServer.listen(3000, ()=>{
    console.log("Escuchando conexiones en el puerto 3000");
})



/* Eventos de escucha */


