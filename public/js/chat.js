const socket = io();
var params = new URLSearchParams(window.location.search)


if( !params.get('name') || !params.get('sala')) {
    window.location = 'index.html'
    throw new Error('Nombre y Sala son obligatorios')
}

const usuario = {
    nombre:params.get('name'),
    sala:params.get('sala')
}

socket.on('connect', ()=>{
    socket.emit('ingreso-chat', usuario, (payload)=>{
            cargaUsuarios(payload)
              
    })

})

socket.on('usuariosConectados', (usuarios)=>{
    console.log(usuarios);
    cargaUsuarios(usuarios)
   
})

socket.on('nuevoMensaje', mensaje=>{
    cargarMensaje(mensaje,'chat-message-right','mr-3' )
    console.log(mensaje);
})

socket.on('mensajePrivado', (message)=>{
    cargarMensaje(message,'chat-message-right','mr-3' )
})



