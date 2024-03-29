import express from "express";
import {createCart}from "../services/cart.service.js";
import {getProductById,getAllProducts} from "../services/product.service.js";

const cartRoutes = express.Router();

cartRoutes.get("/:pid",async(req,res)=> {
  const { pid } = req.params;
  const id='6605e7f788dde60a61239901';
 
  try {
    const productFound = await getProductById(pid);
    const cartCreated = await createCart(productFound,id);
    return cartCreated;
     
   // return productFound ;
  } catch (err) {
    console.log(err);
    return res.render("404", { message: `Erro ${err}` });
  }
  
}) 


export default cartRoutes;
