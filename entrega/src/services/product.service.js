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
  sort = { price: 1 }, //teste ok para ordenação
}) => {
  //usando o paginate para buscar os valores no MongoDB
  try {
    limit = parseInt(limit);
    
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

let productObjDocs= productObj.docs.map((product) => product.toJSON()); // pegando o array de produtos para visualiazar no handlebars
 // não sei se é necessario o metodo agregate  fiquei na duvida
productObjDocs = await productModel.aggregate([
  // { $sort:sort }, // Aplicando a ordenação : obs um erro acontece trazendo um item vazio
  { $limit: limit }, // Limitando o número de documentos retornados por página
]);

  
    return productObjDocs;
    
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllProducts = async () => {
  // teste para pesquisar 
  /*  
  let productsFound = await productModel.aggregate([
    {$match:{title:{$regex:"R"}}}
]);
*/
  //productsFound = productsFound.map((product) => product.toJSON());

  //return productsFound;
};

const getProductById = async (id) => {
  const product = await productModel.findOne({ code: id });
  const productJSON = product.toJSON();
   return productJSON;
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
