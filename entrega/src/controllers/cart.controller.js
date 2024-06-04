import {
  createCart,
  deleteCart,
  getCartById,
  getAllCarts,
  
} from "../services/cart.service.js";
import { getProductById, getAllProducts } from "../services/product.service.js";

const getCartAll= async()=>{

  try {
    const carts= await getAllCarts();

  } catch (error) {
    
  }
}

const getById = async (req, res) => {
  const idCart = await  req.session.idCart;
  console.log(idCart)

  try {
    const productFoundCart = await getCartById(idCart);
    return res.render("cart", { productFoundCart });
  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }
};
// alterado nome da função
const addProductCarts = async (req, res) => {
  // busca idDo carrinho para verificar se ja existe
  const idCart = req.body.localCartID; // nao encontrei um meio de fazer dinamico, sem ter um usuario para cada carrinho.
  const idProduct = req.body.id;
   
  

  try {
    const cartID = await getCartById(idCart);
    const productFound = await getProductById(idProduct); //  pega product pelo front atravez do id
    
    const cartCreated = await createCart(productFound, cartID); //envia para service para salvar no banco
    let numbersItensCart=cartCreated.productsCart.length;
    req.session.idCart=cartCreated._id;
    res.json({cartID:cartCreated._id, NIC:numbersItensCart});
    
    return cartCreated;
  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }
};


// deleta todo o carrinho pelo id
const deletedCart = async (req, res) => {
  const { cid } = req.params; // deletar o carrinho tem que digitar o id produto na URL
  
  
  try {
    const deleteProductCart = await deleteCart(cid);
    return res.render("cart", { deleteProductCart });
  } catch (error) {
    console.log(error);
    return res.render("404", { message: `Erro ${error}` });
  }
  
};

export { getById, addProductCarts, deletedCart };
