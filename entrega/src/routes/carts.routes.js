import express from "express";

import {
  getById,
  getAllCart,
  deletedCart,
} from "../controllers/cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.get("/:pid", getById);

cartRoutes.post("/", getAllCart);

cartRoutes.delete("/delete/:cid", deletedCart);

export default cartRoutes;
