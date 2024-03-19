import { cartModel } from "../DB/Mongo/models/cartModel";

const createCart = async (cart) => {
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
  const cart = await cartModel.findById(id);

  return cart;
};

export { createCart, deleteCart, updateCart, getCartById };
