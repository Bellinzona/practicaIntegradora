let miNombreUsuario = "";
let socket = io() 

const nombreUsuarioTitulo = document.getElementById("nombreUsuario")
const messageInput = document.getElementById("messageInput")
const messagesLog = document.getElementById("messagesLog")
const btnEnviar = document.getElementById("btnEnviar")



btnEnviar.addEventListener("click", () => {
    console.log(messageInput.value,miNombreUsuario)
    socket.emit("Nuevomensaje", {
        usuario: miNombreUsuario ,
        mensaje: messageInput.value
    } ), 
    console.log("enviado")
})

socket.on('mensajesHistorial', (data) => {
    console.log(data);
    const mensajes = data.mensaje; // Este es el array que contiene los mensajes
    messagesLog.innerHTML= '';
    mensajes.forEach(m => {
        messagesLog.innerHTML+= `${m.usuario}: ${m.mensaje}<br/>`;
    });
});





Swal.fire({
    title: "login",
    text: "ingresa nombre de usuario",
    input: "text",
    allowOutsideClick: false,
    inputValidator: (value) => {
        if  (!value){
            return "se necesita un nombre e usuario"
        }
    }
}).then((result) => {
    miNombreUsuario = result.value
    console.log(miNombreUsuario)
    nombreUsuarioTitulo.innerHTML = miNombreUsuario
    

})

