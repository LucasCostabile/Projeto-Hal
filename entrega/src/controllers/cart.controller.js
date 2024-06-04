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
  const idCart = await  req.cookies.accessCart; // pega o id via cookie para buscar itens no carrinho e mostrar

  let userName="";
  if(req.user){
   userName=req.user.name;
  }
  console.log(idCart)

  try {
    const productFoundCart = await getCartById(idCart);
    return res.render("cart", { productFoundCart,userName:userName });
  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }
};
// alterado nome da função  
// obs criar função para limpar os dados "cookies, session, etc..." depois de finalizar processo
const addProductCarts = async (req, res) => {
  // busca idDo carrinho para verificar se ja existe
  const idCart = req.body.localCartID; // pega idCart no locarlStorage
  const idProduct = req.body.id; 
   
  

  try {
    const cartID = await getCartById(idCart);
    const productFound = await getProductById(idProduct); //  pega product pelo front atravez do id
    const cartCreated = await createCart(productFound, cartID); 
    let numbersItensCart=cartCreated.productsCart.length;  // numero de itens do carrinho selecionado
    cartCreated._id;
    res.cookie("accessCart",cartCreated._id);// salva id do carrinho via cookie
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
