import {
  createCart,
  deleteCart,
  getAllCarts,
  getCartByIdUser,
} from "../services/cart.service.js";

import { getProductById, getAllProducts } from "../services/product.service.js";

const getCartAll = async () => {
  res.render("404");
  try {
    const carts = await getAllCarts();
  } catch (error) {}
};

const getById = async (req, res) => {
  const idCart = await req.params.id;
  res.cookie("accessCart", idCart);
  let userName = "";
  if (req.user) {
    userName = req.user.name;
  }

  try {
    const productFoundCart = await getCartById(idCart);
    return res.render("cart", { productFoundCart, userName: userName });
  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }
};

const addProductCarts = async (req, res) => {
  console.log("entrei no addProducts no controller ")
 
  // busca idDo carrinho para verificar se ja existe
  const idUser = req.body.id;
  console.log("ID_USER ############",idUser);
 
  const idProduct = req.body.product._id
  console.log("ID_PRODUTO %%%%%%%%%%%%%%%%%%%",idProduct);

  console.log(req.body, "BODY COMPLETP!!!");
  
  try {
    const cartID = await getCartByIdUser(idUser);
    console.log(cartID, "&&&&&&&&&&");

    const productFound = await getProductById(idProduct);

    console.log(idProduct, "***************");
    const addNumberItens = { ...productFound, qtdItens: 1 }; //  pega product pelo front atravez do id

    const cartCreated = await createCart(addNumberItens, cartID);

    let numbersItensCart = cartCreated.productsCart.length; // numero de itens do carrinho selecionado

    return res.json({
      cartID: cartCreated._id,
      NIC: numbersItensCart,
      cartCreated,
    });

    //return cartCreated;
  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }
};

// deleta todo o carrinho pelo id
const deletedCart = async (req, res) => {
  const { cid } = req.params; // deletar o carrinho tem que digitar o id produto na URL
  try {
    const deleteProductCart = await deleteCart(cid);
    return res.render("cart", { deleteProductCart });
  } catch (error) {
    console.log(error);
    return res.render("404", { message: `Erro ${error}` });
  }
};

export { getById, addProductCarts, deletedCart, getCartAll };
