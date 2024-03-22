import { cartModel } from "../DB/Mongo/models/cartModel.js";

const createCart = async (cart) => {
  const create_cartID = () => {
    let cartID = `C${Math.floor(Math.random + 1) * 5}`;
    return cartID;
  };
  cart = {
    cart_ID: create_cartID(),
    ...cart,
  };
  const newCart = await cartModel.create(cart);

  return newCart;
};

const deleteCart = async (id) => {
  const deletedCart = await cartModel.deleteOne(id);

  return deletedCart;
};

const updateCart = async (id, cart) => {
  const updatedCart = cartModel.findByIdAndUpdate(id, cart);

  return updatedCart;
};

const getCartById = async (id) => {
  const cart = await cartModel.findOne(id).populate("products");

  return cart;
};

export { createCart, deleteCart, updateCart, getCartById };
