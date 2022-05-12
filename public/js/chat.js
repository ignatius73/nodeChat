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
        console.log(payload);
    })

})

socket.on('usuariosConectados', (usuarios)=>{
    console.log(usuarios);
})


socket.on('nuevoMensaje', mensaje=>{
    console.log(mensaje);
})

