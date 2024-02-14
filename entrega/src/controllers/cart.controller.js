import ManagerCart from "../models/ManagerCarts.js";
const cartManager = new ManagerCart();

export const createCart = async (req, res) => {
  const prod = req.body;
  try {
    cartManager.createCart(prod);
    res.status(200).json("Produto adiconado ao carrinho");
  } catch (error) {
    console.log(error);
    res.status(500).json("Erro ao adicionar o produto!");
  }
};

export const getById = async (req, res) => {
  const id = req.params.cid;

  try {
    const prods = cartManager.getProductById(id);
    res.status(200).json(prods);
  } catch (error) {
    console.log(error);
    res.status(404).json("Erro ao encontrar o produto! verifique o id.");
  }
};

export const addProductInCart = async (req, res) => {
  const { cid, pid } = req.params;
  const prods = req.body;

  try {
    cartManager.updateProds(cid, pid, prods);
    res.status(200).json("Carrinho atualizado com sucesso!");
  } catch (error) {
    console.log(error);
    res.status(500).json("erro interno!");
  }
};
