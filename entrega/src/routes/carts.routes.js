import express from "express";

import {
  getById,
  addProductCarts,
  deletedCart,
  getCartAll
} from "../controllers/cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.get("/:id", getById);
cartRoutes.get("/null", getCartAll);
cartRoutes.post("/", addProductCarts);
cartRoutes.delete("/cart/:cid", deletedCart); 
export default cartRoutes;
