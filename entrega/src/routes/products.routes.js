import express from "express";
//metodos do service de Produtos
import {
  createProduct,
  getAllProducts,
  getProductById,
  updatedProduct,
  deleteProduct,
  getProductsWithPaginate,
} from "../services/product.service.js";
//Rotas do express
const prodRouter = express.Router();
//import do middleware
import { productValidation } from "../middleware/productValidation.js";

prodRouter.get("/", async (req, res) => {
  try {
    const prods = await getProductsWithPaginate();
    console.log(prods);
    res.render("productsForm", prods.doc);
  } catch (error) {
    console.log(error);
    res.render("404", { message: "Erro ao listar os produtos!" });
  }
});

prodRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productFound = await getProductById(pid);
    console.log(productFound);
    return res.render("productsForm", { productFound });
  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }
});

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
