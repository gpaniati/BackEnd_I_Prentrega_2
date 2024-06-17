//Lado del cliente.
const socket = io();

//Devuelve la estructura html de una Card de Boostrap.
const crearCarta = (producto) => {
    return (`
            <div class="col-md-3">
                <div class="card mb-3" style="width: 20rem">
                    <img src="${producto.thumbnails}" class="card-img-top" alt="${producto.code}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">${producto.description}</p>
                        <p class="card-text">Precio: $${producto.price}</p>
                        <button type="button" class="btn btn-danger"
                            onclick="eliminarProducto('${producto.id}')">Eliminar</button>
                    </div>
                </div>
    `);
}

//Renderiza los productos en el contenerdor de cartas del layout realTimeProducts.
const renderizarProductos = (productos) => {
    //Selecciono el contenedor de la carta del layout realTimeProducts
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ``;
    productos.forEach( producto => {
        const cardHTML = crearCarta(producto);
        cardsContainer.innerHTML += cardHTML;
    });
 }

//Elimina un producto de la base de productos.
const eliminarProducto = (id) => {
    socket.emit("eliminar-producto", id);
}

//Notificación de producto eliminado a todos los clientes conectados al servidor.
//Envio de render a todos los clientes conectados.
socket.on("producto-eliminado", (id) => {
    console.log("Sweet Alert");
    Swal.fire({
        toast: true,
        position: "top-end",
        timer: 2000,
        timeProgressBar: true,
        title: `Han eliminado el producto ${id} de la base`,
        icon: "success",
    });
});

//Renderiza los productos de la base cuando se conecta un cliente.
socket.on("cliente-conectado", (productos) => {
    renderizarProductos(productos);
});

//Renderiza los productos de la base frente a una accion de algun cliente sobre la misma.
socket.on("base-actualizada", (productos) => {
    renderizarProductos(productos);
});


/*




    console.log(productos);
    /*
    if (!user) return;

    const messageLogs = document.getElementById("message-logs");
    messageLogs.innerText = "";

    data.messages.forEach((message) => {
        const li = document.createElement("li");
        li.innerHTML = `${message.user.name} dice: <b>${message.message}</b>`;
        messageLogs.append(li);
    });*/

/*
// Alerta que muestra cuando se ha conectado un nuevo usuario
socket.on("message-logs", (data) => {
    if (!user) return;

    const messageLogs = document.getElementById("message-logs");
    messageLogs.innerText = "";

    data.messages.forEach((message) => {
        const li = document.createElement("li");
        li.innerHTML = `${message.user.name} dice: <b>${message.message}</b>`;
        messageLogs.append(li);
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