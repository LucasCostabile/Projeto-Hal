import express from "express";
import { createCart, deleteCart, getCartById } from "../services/cart.service.js";
import { getProductById, getAllProducts } from "../services/product.service.js";

const cartRoutes = express.Router();

cartRoutes.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const productFoundCart = await getCartById(pid);
    return res.render("cart", { productFoundCart });

  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }

})

cartRoutes.post("/", async (req, res) => {
  // busca idDo carrinho para verificar se ja existe
 const idCart="6609b83ed74ce852395a21bb" // fazer dinamico 

  const idProduct=req.body.id; 
   try {
    const cartID = await getCartById(idCart); 
  
    const productFound = await getProductById(idProduct); //  pega product pelo front atravez do id 
   const cartCreated = await createCart(productFound, cartID);  //envia para service para salvar no banco
   return cartCreated;
    
  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }

})

cartRoutes.get("/delete/:cid", async (req, res) => {
  const { cid } = req.params; // deletar produto tem que digitar o id produto na URL
  try {
    const deleteProductCart = await deleteCart(cid);
    return res.render("cart", { deleteProductCart });
  } catch (error) {
    console.log(error);
    return res.render("404", { message: `Erro ${error}` })
  }

})

export default cartRoutes;
