import { Router } from "express";
import ProductManager from "../managers/productsManager.js";

const router = Router();

const baseProducts = new ProductManager();

router.get("/products", async (req, res) => {
    const productos = await baseProducts.consultarProductos();
    res.render("index", { title: "Productos", productos });
});

//
router.get("/realtimeproducts", async (req, res) => {
    const productos = await baseProducts.consultarProductos();
    res.render("realTimeProducts", { title: "Productos en tiempo real", productos });
});

export default router;