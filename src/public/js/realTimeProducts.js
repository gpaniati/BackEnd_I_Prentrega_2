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
socket.on("producto-eliminado-resto", (id) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        timer: 2000,
        timeProgressBar: true,
        title: `Han eliminado el producto ${id} de la base`,
        icon: "success",
    });
});

//Notificación de producto eliminado al cliente q lo eliminó.
socket.on("producto-eliminado-autor", (id) => {
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

//Renderiza los productos de la base frente a la accion de algun cliente sobre la misma (Eliminar producto/ Añadir Producto).
socket.on("renderizar-base", (productos) => {
    console.log(productos);
    renderizarProductos(productos);
});