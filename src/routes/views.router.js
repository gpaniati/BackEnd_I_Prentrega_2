import { Router } from "express";
import ProductManager from "../managers/productsManager.js";

const router = Router();

const baseProducts = new ProductManager();

router.get("/products", async (req, res) => {
    const productos = await baseProducts.consultarProductos();
    res.render("index", { title: "Productos", productos });
});


router.get("/realtimeproducts", async (req, res) => {
    console.log("Entro1");
    const productos = await baseProducts.consultarProductos();
    res.render("realTimeProducts", { title: "Productos en tiempo real", productos });
});

/*
// Método que responde a las URL inexistentes
router.use("*", (req, res) => {
    return res.status(404).send("Recurso no encontrado");
});*/

export default router;