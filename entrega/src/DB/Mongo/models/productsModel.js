import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productColection, productSchema);
