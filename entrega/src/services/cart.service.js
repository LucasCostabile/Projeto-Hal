import { cartModel } from "../DB/Mongo/models/cartModel.js";

const createCart = async (cartData,id) => {
  

  try {
       
    let cartExist = await cartModel.findOne({_id: id});
    
    if (cartExist) {
     console.log("produtos" +cartExist);
      cartExist.productsCart.push(cartData);//  pegar id do produto e somar quantyti
      
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

  return ;
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
