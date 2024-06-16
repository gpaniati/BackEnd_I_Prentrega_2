import { Server } from "socket.io";
import ProductManager from "../managers/productsManager.js";

const baseProducts = new ProductManager();

const config = (serverHTTP) => {
    const serverSocket = new Server(serverHTTP);

    serverSocket.on("connection", async (socket) => {
        console.log("Cliente conectado");

        const productos =  await baseProducts.consultarProductos()
        socket.emit("inicializarProductos", productos);

        //Eliminar producto.
        socket.on("eliminar-producto", ( id ) => {
            baseProducts.eliminarProducto(id);
            socket.broadcast.emit("producto-eliminado", id);
        });
    });
};

export default {
    config,
};