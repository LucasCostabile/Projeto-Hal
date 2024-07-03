import express from "express";

// import do middleware
import { productValidation } from "../middleware/productValidation.js";
import {authCheck} from "../middleware/authCheck.js";

//Rotas do express
const prodRouter = express.Router();

import {
  creatProduct,
  getAllProducts,
  getById,
  upDateProduct
} from "../controllers/product.controller.js";
import { authToken } from "../Utils/jwt.utils.js";

prodRouter.get("/home", (req,res) => {
  res.render("index")
})



prodRouter.get("/products", getAllProducts);

prodRouter.get("/products/:pid", getById);

prodRouter.post("/products", productValidation, creatProduct);

prodRouter.get("/prod/:id",upDateProduct);

prodRouter.delete("/:id");

export default prodRouter;
