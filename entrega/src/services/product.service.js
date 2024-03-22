import { productModel } from "../DB/Mongo/models/productsModel.js";

const createProduct = async (product) => {
  const newProduct = await productModel.create(product);

  return newProduct;
};
const getProductsWithPaginate = async (limit, page, query, sort) => {
  if (!limit) {
    limit = 10;
  }
  if (!page) {
    page = 1;
  }
  if (!query) {
    query = {};
  }
  try {
    let products = await productModel.paginate(query, {
      page: page,
      limit: limit,
    });

    const productObj = {
      status: true,
      ...products,
    };

    return productObj;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllProducts = async () => {
  let productsFound = await productModel.find();

  productsFound = productsFound.map((product) => product.toJSON());

  return productsFound;
};

const getProductById = async (id) => {
  const product = await productModel.findOne({ code: id });

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
  getProductsWithPaginate,
  deleteProduct,
  updatedProduct,
};
