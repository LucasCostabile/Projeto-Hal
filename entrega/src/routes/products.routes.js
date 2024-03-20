import express from "express";
//metodos do service de Produtos
import {
  createProduct,
  getAllProducts,
  getProductById,
  updatedProduct,
  deleteProduct,
} from "../services/product.service.js";
//Rotas do express
const prodRouter = express.Router();
//import do middleware
import { productValidation } from "../middleware/productValidation.js";

prodRouter.get("/", async (req, res) => {
  try {
    const prods = await getAllProducts();
    res.render("productsForm", { prods });
  } catch (error) {
    console.log(error);
    res.render("404", { message: "Erro ao listar os produtos!" });
  }
});

prodRouter.get("/:pid");

prodRouter.post("/", productValidation, async (req, res) => {
  const product = req.body;

  try {
    const createdProduct = await createProduct(product);
    console.log(createdProduct);
    res.render("productsForm");
  } catch (error) {
    console.log(error);
    res.render("404", { message: "Erro ao cadastrar o produto!" });
  }
});

prodRouter.put("/:id");

prodRouter.delete("/:id");

export default prodRouter;
