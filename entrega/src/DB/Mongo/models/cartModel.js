import { json } from "express";
import mongoose from "mongoose";
const cartCollection = "cart";

const cartSchema = new mongoose.Schema({

  products: [],
  id_user: {
    type: String,
    unique: true
  }
  
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
