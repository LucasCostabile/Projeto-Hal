import { cartModel } from "../DB/Mongo/models/cartModel.js";

const createCart = async (cartData, id) => {
  try {
    let cartExist = await cartModel.findOne({ _id: id });
    if (cartExist) {
      cartExist.productsCart.push(cartData);// fazer pegar id do produto e somar quantyti
      await cartExist.save();  
      return cartExist;;
    }
    else {
     const newCart = await cartModel.create({ productsCart: cartData});
     return newCart;
   }

  } catch (error) {
    console.log(error);
  }

  return;
};

const deleteCart = async (id) => {
  const deletedCart = await cartModel.deleteOne({_id: id});
  console.log("produto "+ id + deletado);
  return deletedCart;
};


const updateCart = async (id, cart) => {
  const updatedCart = cartModel.findByIdAndUpdate(id, cart);
  return updatedCart;

};

const getCartById = async (id) => {
  if(id!=""){
    const cart = await cartModel.findById(id);
  if(cart!=null){
    const cartJSON = cart.toJSON();
  return cartJSON;
  }
  else{
    console.log("id carrinho é nulo")
  }

  }
  
  else{
    console.log("nao encontrado")
  }
  
}

export { createCart, deleteCart, updateCart, getCartById };
