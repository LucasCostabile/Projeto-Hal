import { cartModel } from "../DB/Mongo/models/cartModel.js";

const createCart = async (cartData, id) => {
  
  try {
    let cartExist = await cartModel.findOne({ _id: id });
    if (cartExist) {
      cartExist.productsCart.push(cartData); // fazer pegar id do produto e somar quantyti
      await cartExist.save();
      return cartExist;
    } else {
      const newCart = await cartModel.create({ productsCart: cartData });
      return newCart;
    }
  } catch (error) {
    console.log(error);
  }
  
};

const deleteCart = async (cid) => {
  console.log(cid);
  const deletedCart = await cartModel.deleteOne({ _id: cid });
  if(deletedCart.deletedCount>0){
    console.log("produto " + cid + "deletado");
  }
  else {
    console.log("erro ao excluir produto do carrinho")
  }
  console.log(deletedCart);
  
  return deletedCart;
};

const updateCart = async (id, cart) => {
  const updatedCart = cartModel.findByIdAndUpdate(id, cart);
  return updatedCart;
};

const getCartById = async (id) => {
  if (id != "") {
    const cart = await cartModel.findById(id);
    if (cart != null) {
      const cartJSON = cart.toJSON();
      return cartJSON;
    } else {
      console.log("Criando novo carrinho");
    }
  } else {
    console.log("nao encontrado");
  }
};


const getAllCarts= async()=>{
  const cartAll= await cartModel.find();
  console.log(cartAll);
  return cartAll;

}
export { createCart, deleteCart, updateCart, getCartById,getAllCarts};
