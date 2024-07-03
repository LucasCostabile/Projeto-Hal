//metodos do service de Produtos
import {
  createProduct,
  getProductById,
  getProductsWithPaginate,
  updatedProduct,
} from "../services/product.service.js";



const getAllProducts = async (req, res) => {
  //pegando os valores dos paramentros do browser por query params
  const { limit, page, query, sort } = req.query;

  try {
    //Fazendo a chamada do Service de produtos enviando os valores da query como um objeto para facilitar definir valores por default
    const prods = await getProductsWithPaginate({ limit, page, query, sort });
    let productObjDocs = prods.docs.map((product) => product.toJSON());

    //enviado os valores para a view do objeto prods com a propriedade docs e as page.
   
      let userName = "";
      let role="";
        if (req.user) {
          userName = req.user.name;
          role= req.user.role;
        }
    res.render("productsForm", { prods: productObjDocs, page: prods.page,userName, role});
  } catch (error) {
    console.log(error);
    res.render("404", { message: "Erro ao listar os produtos!" });
  }
};

const getById = async (req, res) => {
  const { pid } = req.params;
  try {
    const productFound = await getProductById(pid);

    return res.render("productsForm", { productFound });
  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }
};

const creatProduct = async (req, res) => {
  const product = req.body;

  try {
    const createdProduct = await createProduct(product);
    console.log(createdProduct);
    res.redirect("/api/products");
  } catch (error) {
    console.log(error);
    res.render("404", { message: "Erro ao cadastrar o produto!" });
  }
};


const upDateProduct= async(req,res)=>{
  const { pid } = req.params;
  console.log(pid);
  try {
    const productFound = await getProductById(pid);

    return res.render("update", { productFound });
  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }
/*
  console.log(pid);
  const products=req.body;
  const productsUpdate= await updatedProduct(pid,products);
*/
  res.render("update",{produts: productsUpdate})

}

export { getAllProducts, getById, creatProduct,upDateProduct };
