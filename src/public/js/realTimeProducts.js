const socket = io();

//Elimina un producto de la base de productos.
const eliminarProducto = (id) => {
    socket.emit("eliminar-producto", id);
}

//Notificación de producto eliminado a todos los clientes conectados al servidor.
socket.on("producto-eliminado", (id) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        timer: 2000,
        timeProgressBar: true,
        title: `Han eliminado el producto ${id} de la base`,
        icon: "success",
    });
});

/*
Swal.fire({
    title: "Identificate",
    input: "text",
    confirmButtonText: "Ingresar",
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "ingresa tu nombre de usuario";
    },
}).then((result) => {
    user = { name: result.value };
    userName.innerText = user.name;
    socket.emit("authenticated", user);
});

chatText.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        socket.emit("message", { user, message: chatText.value });
    }
});

socket.on("message-logs", (data) => {
    chatLogs.innerHTML = "";

    data.messages.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.user.name} dice: <b>${item.message}</b>`;
        chatLogs.append(li);
    });
});



*/