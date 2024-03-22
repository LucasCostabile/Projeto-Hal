import { productModel } from "../DB/Mongo/models/productsModel.js";

const createProduct = async (product) => {
  const newProduct = await productModel.create(product);

  return newProduct;
};
//Buscando os valores no mongoDB com o mongoosePaginate pasando os valores de limit page query e sort
const getProductsWithPaginate = async ({
  limit = 10,
  page = 1,
  query = {},
  sort = { price: -1 },
}) => {
  //usando o paginate para buscar os valores no MongoDB
  try {
    const products = await productModel.paginate(query, {
      page: page,
      limit: limit,
      sort: sort,
    });
    //criando um objeto novo para a resposta como o exercicio pede.
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
