var params = new URLSearchParams(window.location.search)



let listaUsuarios = document.querySelector('#conectados');
let sendMessage = document.querySelector('#sendMessage');
let txtMessage = document.querySelector('#txtMessage');
let chatMessages = document.querySelector('.chat-messages');
let usuarioConectado = document.querySelector('#usuarioConectado');
let nombreUsuario = params.get('name');
let nrosala = params.get('sala');
let to = '';
/* const boton = document.querySelector('#enviarMensaje')
boton.addEventListener('click', ()=>{
    socket.emit('nuevoMensaje', 'Hola a todos', (payload)=>{
        console.log(payload);
    })
})
 */

function cargaUsuarios(usuariosConectados){

    console.log(usuariosConectados);

    let html = '';

    usuariosConectados.forEach( usuariosConectados =>{

        if( nrosala !== usuariosConectados.sala ) return
        if( nombreUsuario  == usuariosConectados.nombre ) return
        
        html += `<a data-id="${usuariosConectados.id}" id="usuarioConectado" href="#" class="list-group-item list-group-item-action border-0">
        <div class="badge bg-success float-right">5</div>
        <div class="d-flex align-items-start">
            <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40">
            <div class="flex-grow-1 ml-3" data-id="${usuariosConectados.id}" data-nombre="${usuariosConectados.nombre}">
                ${ usuariosConectados.nombre }
            </div>
        </div>
        </a>`

    })

    listaUsuarios.innerHTML = html;


}

listaUsuarios.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(e.target.dataset.id);
    if(!e.target.dataset.id)return;
    to = e.target.dataset.id;
    let nombre = e.target.dataset.nombre;
    txtMessage.setAttribute('placeholder', `Mensaje para ${nombre}`)
    
})

sendMessage.addEventListener('click', (e)=>{
    e.preventDefault();
    if(txtMessage.value == '' ) return

        const message = {
            message : txtMessage.value,
            from: nombreUsuario,
            sala: nrosala
        }
        if ( to == ''){
            socket.emit('nuevoMensaje', message, (payload)=>{
                cargarMensaje(payload,'chat-message-left', 'ml-3' );
            })

        }else{
            message.to = to;
            socket.emit('mensajePrivado', message, (payload)=>{
                txtMessage.value = "";
                to="";
                cargarMensaje(payload,'chat-message-left', 'ml-3' );
            })
        }



})


function cargarMensaje(message, claseName, m3){
    let mensaje = document.createElement('div')
    mensaje.classList.add(claseName);
    mensaje.classList.add('pb.4')

    if( m3 == 'ml-3'){
        mensaje.innerHTML = `<div>
        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
        <div class="text-muted small text-nowrap mt-2">2:33 am</div>
        </div>
        <div class="flex-shrink-1 bg-primary rounded py-2 px-3 ${m3}">
        <div class="font-weight-bold mb-1">${message.from}</div>
        <span class="text-white">
            ${message.message}
        </span>
        </div>`

    }else{
        mensaje.innerHTML = `<div>
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                            <div class="text-muted small text-nowrap mt-2">2:33 am</div>
                            </div>
                            <div class="flex-shrink-1 bg-success rounded py-2 px-3 ${m3}">
                                <div class="font-weight-bold mb-1">${message.from}</div>
                                <span class="text-white">
                                     ${message.message}
                                </span>
                                  
                            </div>`
    }

    chatMessages.append(mensaje)

}

