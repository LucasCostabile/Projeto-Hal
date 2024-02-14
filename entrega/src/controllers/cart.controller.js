import ManagerCart from "../models/ManagerCarts.js";
const cartManager = new ManagerCart();

export const createCart = async (req, res) => {
  const prod = req.body;
  console.log(prod);

  res.status(200).json("Produto adicionado ao carrinho");
};

export const getById = async (req, res) => {
  const id = req.params.cid;

  console.log(id);

  res.status(200).json("produto encontrado");
};

export const addProductInCart = async (req, res) => {
  const { cid, pid } = req.params;

  console.log(`Cart ID: ${cid}, prod ID: ${pid}`);

  res.status(200).json("Tudo ok");
};
