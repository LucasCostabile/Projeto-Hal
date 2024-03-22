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
  //pegando os valores dos paramentros do browser por query params
  const { limit, page, query, sort } = req.query;
  try {
    //Fazendo a chamada do Service de produtos enviando os valores da query como um objeto para facilitar definir valores por default
    const prods = await getProductsWithPaginate({ limit, page, query, sort });
    console.log(prods);
    //enviado os valores para a view do objeto prods com a propriedade docs que contem os valores que buscamos no mongoDB.
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
