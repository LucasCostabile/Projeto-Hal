import mongoose from "mongoose";
const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  product: [{ code: String, quantity: Number }],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
