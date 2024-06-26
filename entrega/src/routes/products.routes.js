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
} from "../controllers/product.controller.js";
import { authToken } from "../Utils/jwt.utils.js";

prodRouter.get("/home", (req,res) => {
  res.render("index",{name: req.session.name })
})



prodRouter.get("/", getAllProducts);

prodRouter.get("/:pid", getById);

prodRouter.post("/", productValidation, creatProduct);

prodRouter.put("/:id");

prodRouter.delete("/:id");

export default prodRouter;
