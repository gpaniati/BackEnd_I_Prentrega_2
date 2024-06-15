import { Server } from "socket.io";
import ProductManager from "../managers/productsManager.js";

const baseProducts = new ProductManager();

const config = (serverHTTP) => {
    const serverSocket = new Server(serverHTTP);

    serverSocket.on("connection", (socket) => {
        console.log("Cliente conectado");

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