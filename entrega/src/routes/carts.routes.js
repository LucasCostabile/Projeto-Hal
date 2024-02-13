const express = require("express");
const cartController = require("../controllers/cartController.controller");

const cartRoutes = express.Router();

cartRoutes.post("/", (req, res) => {
  const newProduct = {
    product: req.body,
  };

  try {
    cartController.createnewCart(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json("Erro ao criar interno ");
  }
});

cartRoutes.get("/:cid", (req, res) => {
  const id = Number(req.params.cid);

  try {
    cartController.getProd(id);
    res.status(200).json("ok!");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

cartRoutes.post("/:cid/product/:pid", (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;

  const newProduct = req.body;

  try {
    cartController.addNewProduct(prodId, cartId, newProduct);
    res.status(200).json("tudo certo");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
