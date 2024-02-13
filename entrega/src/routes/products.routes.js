const express = require("express");
const prodController = require("../controllers/products.controller");

const prodRouter = express.Router();

prodRouter.get("/", (req, res) => {
  try {
    const allprods = prodController.getall();
    res.send(allprods);
  } catch (error) {
    console.log(error);
    res.status(500).json("Erro interno!");
  }
});

prodRouter.get("/:pid", (req, res) => {
  const id = Number(req.params);

  try {
    const allprods = prodController.getById(id);
    res.send(allprods);
  } catch (error) {
    console.log(error);
    res.status(500).json("Erro interno!");
  }
});

prodRouter.post("/", (req, res) => {
  const newProduct = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stock: req.body.stock,
    thumbmail: req.body.thumbmail,
  };
  try {
    prodController.createProd(newProduct);
    res.send("ok!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Erro interno!");
  }
});

prodRouter.put("/:id", (req, res) => {
  const prodUpdated = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stock: req.body.stock,
    thumbmail: req.body.thumbmail,
  };

  const id = Number(req.params.id);
  try {
    prodController.updateProduct(id, prodUpdated);
    res.send("ok!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Erro interno!");
  }
});

prodRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  try {
    prodController.deleteProd(id);
    res.send("ok!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Erro interno!");
  }
});
