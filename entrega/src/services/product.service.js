import { productModel } from "../DB/Mongo/models/productsModel";

const createProduct = async (product) => {
  const newProduct = await productModel.create(product);

  return newProduct;
};

const getAllProducts = async (limit, page, query, sort) => {
  let productsFound = await productModel.find();

  productsFound = productsFound.map((product) => product.toJSON());

  return productsFound;
};

const getProductById = async (id) => {
  const product = await productModel.findById(id);

  return product;
};

const deleteProduct = async (id) => {
  const deletedProduct = await productModel.deleteOne(id);
  return deletedProduct;
};

const updatedProduct = async (id, product) => {
  const updatedProduct = productModel.findByIdAndUpdate(id, product);

  return updatedProduct;
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updatedProduct,
};
