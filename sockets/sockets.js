import { Server } from 'socket.io';
import Chaters from '../classes/chaters.js';

function createChater(id,nombre,sala){
    let obj = new Object();
    obj.nombre = nombre;
    obj.id = id;
    obj.sala = sala;
    return obj
}

function server(server){
    const chaters = new Chaters();
    const io = new Server(server);


    io.on('connection', socket =>{
        console.log('Cliente conectado ' + socket.id);

        
    
        socket.on('ingreso-chat', (chater, callback)=>{
            socket.join(chater.sala);
            const newChater = createChater(socket.id, chater.nombre, chater.sala);
            chaters.addChater(newChater);
            const usuariosConectados = chaters.getChaters()
            console.log(usuariosConectados);
            socket.broadcast.emit('usuariosConectados', usuariosConectados)
            callback(usuariosConectados);

    
        })
        socket.on('disconnect',()=>{
            console.log('Cliente desconectado ' + socket.id);
            chaters.deleteChater(socket.id)
            socket.emit('usuariosConectados', chaters.getChaters())
        })

        socket.on('nuevoMensaje', (mensaje, callback)=>{
            
            const chater = chaters.searchChaterById(socket.id)
            console.log(chater);
            socket.broadcast.to(chater.sala).emit('nuevoMensaje', mensaje)
            callback(mensaje)
        })

        socket.on('mensajePrivado', (mensaje, callback)=>{
            
            const chater = chaters.searchChaterById(socket.id)
            console.log(chater);
            socket.broadcast.to(mensaje.to).emit('mensajePrivado', mensaje)
            callback(mensaje);
        })

        /* mensajePrivado*/    
    
    
    })

}

export default server;

