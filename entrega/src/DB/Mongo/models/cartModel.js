import mongoose from "mongoose";
const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  //criando um ID proprio para facilitar as buscas
  cart_ID: {
    type: Number,
    unique: true,
  },
  //produto que vamos trazer com o populate
  product: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],
    default: [],
  },
  //quantidade de produtos no carrinho
  quantity: Number,
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
