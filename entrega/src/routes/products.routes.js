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
  upDateProduct,
  editProduct
} from "../controllers/product.controller.js";
import { authToken } from "../Utils/jwt.utils.js";

prodRouter.get("/home", (req,res) => {
  res.render("index",{name: req.session.name })
})



prodRouter.get("/products", getAllProducts);

prodRouter.get("/products/:pid", getById);

prodRouter.post("/products", productValidation, creatProduct);

prodRouter.get("/products/edit/:id",editProduct);
prodRouter.put("/products/edit/:id",upDateProduct);

prodRouter.delete("/:id");

export default prodRouter;
