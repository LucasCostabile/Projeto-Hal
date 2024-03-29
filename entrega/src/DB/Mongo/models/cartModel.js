import mongoose from "mongoose";
const cartCollection = "cart";

const cartSchema = new mongoose.Schema({

  code: {
    type: String,
    unique: true,
  },

  //criando um ID proprio para facilitar as buscas
 

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
