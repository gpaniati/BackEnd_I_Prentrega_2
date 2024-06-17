import { Server } from "socket.io";
import ProductManager from "../managers/productsManager.js";

const baseProducts = new ProductManager();

const config = (serverHTTP) => {
    const serverSocket = new Server(serverHTTP);

    serverSocket.on("connection", async (socket) => {
        console.log("Cliente conectado");

        //Obtiene los productos de la base de productos y emite mensaje para renderizar productos del lado del cliente.
        const productos = await baseProducts.consultarProductos()
        socket.emit("cliente-conectado", productos);

        //Elimina producto de la base y emite un mensaje a todos los usaurios conectados.
        socket.on("eliminar-producto", async ( id ) => {
            await baseProducts.eliminarProducto(id);
            const productosActualizados = await baseProducts.consultarProductos();

            //Emite mensaje para renderizar productos frente a la eliminacion de uno.
            socket.emit("base-actualizada", productosActualizados);
            
            //Emite mensaje para notoficar al resto de los usuarios que se elimino un producto.
            socket.broadcast.emit("producto-eliminado", id);
        });
    });
};

export default {
    config,
};