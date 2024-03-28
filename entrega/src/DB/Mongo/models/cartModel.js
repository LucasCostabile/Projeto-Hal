import mongoose from "mongoose";
const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
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
  quantity: Number,
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
