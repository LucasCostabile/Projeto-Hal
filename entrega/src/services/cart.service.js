import { cartModel } from "../DB/Mongo/models/cartModel.js";

const createCartCode = () => {
  const code = `C${Math.floor(Math.random() * 9999) + 1}`;
  return code;
};

const createCart = async (cart) => {
  cart = {
    code: createCartCode(),
    ...cart,
  };
  try {
    const newCart = await cartModel.create(cart);
    return newCart;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const deleteCart = async (id) => {
  try {
    const deletedCart = await cartModel.deleteOne({ _id: id });
    return deletedCart;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const updateCart = async (id, cart) => {
  const updatedCart = cartModel.findByIdAndUpdate(id, cart);

  return updatedCart;
};

const getCartById = async (id) => {
  try {
    const cart = await cartModel.findById(id).populate("product.product");
    console.log("buscando o carrinho por id no mongo:", cart);
    return cart;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const addProductOnCart = async (cid, pid) => {
  try {
    let cart = await cartModel.findById(cid);

    cart.product[0].push({ product: pid });
    let updatedCart = await cartModel.updateOne({ _id: cid }, cart);

    return updatedCart;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export { createCart, deleteCart, updateCart, getCartById, addProductOnCart };
