import { Router } from "express";
import ProductManager from "../managers/productsManager.js";

const router = Router();
const baseProducts = new ProductManager();

router.get("/", async (req, res) => {

    const productos = await baseProducts.consultarProductos();
    res.render("home", { title: "Home", productos });

});

export default router;