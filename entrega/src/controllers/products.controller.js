import ProductManager from "../models/ManagerProducts.js";
const managerProducts = new ProductManager();

 export const getAll = async (req, res) => {
        try{
            const produtos = await managerProducts.readProductsFromFile();;
            res.status(200).json(produtos);
        }catch (error) {
            console.log(error);
            res.status(500).json({error: "Erro ao consultar produtos."})
        }
    }
     export const getById= async (req, res) => {
        try {
            const limit = req.query.limit;
            const products = await managerProducts.getProductById();
        
            if (limit) {
              const limitedProducts = products.slice(0, +limit);
              res.json({ products: limitedProducts });
            } else {
              res.json({ products });
            }
          } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos' });
          }
    };
    

  export  const create = async (req , res) => {
        const product = req.body;
        try {
          await managerProducts.addProduct(product);
          res.status(201).json({ message: "Produto cadastrado" });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Erro ao cadastrar produtos." });
        }
    }



    
    
    