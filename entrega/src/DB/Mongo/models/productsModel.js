import mongoose, { Schema } from "mongoose";

const productColection = "products";

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  code: {
    type: String,
    unique: true,
  },
  thumbmail: String,
});

export const productModel = mongoose.model(productColection, productSchema);
