import express from "express";

import {
  addProductOnCart,
  createCart,
  deleteCart,
  getCartById,
  updateCart,
} from "../services/cart.service.js";

const cartRoutes = express.Router();

cartRoutes.post("/", async (req, res) => {
  const cart = req.body;
  try {
    const cartCreated = await createCart(cart);
    console.log(cartCreated);
    res.render("index");
  } catch (error) {
    console.log(error);
    res.render("404", { message: "Erro ao adicionar produto no carrinho" });
  }
});

cartRoutes.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await getCartById(cid);

    res.render("index");
  } catch (error) {
    console.log(error);
    res.render("404", { message: "erro ao buscar carrinho" });
  }
});

cartRoutes.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const resposta = await addProductOnCart(cid, pid);
    console.log(resposta);
    res.render("index");
  } catch (e) {
    console.log(e);
    res.render("404", { message: e });
  }
});

cartRoutes.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const deletedCart = await deleteCart(cid);

    if (deletedCart.deletedCount === 0) {
      res.render("404", { message: "Carrinho nao existente!" });
    }
    res.render("index");
  } catch (error) {
    console.log(e);
    res.render("404", { message: e });
  }
});

cartRoutes.put("/", async (req, res) => {});

export default cartRoutes;
