import express from "express";

import {
  getById,
  addProductCarts,
  deletedCart,
} from "../controllers/cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.get("/", getById);

cartRoutes.post("/", addProductCarts);

cartRoutes.delete("/delete/:cid", deletedCart); // carrinho sendo deletado apenas pelo thunderclient

export default cartRoutes;
