import express from "express";
import {
  getById,
  createCart,
  addProductInCart,
} from "../controllers/cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.post("/", createCart);

cartRoutes.get("/:cid", getById);

cartRoutes.post("/:cid/product/:pid", addProductInCart);

export default cartRoutes;
