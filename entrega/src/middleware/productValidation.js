const productValidation = (req, res, next) => {
  const product = req.body;

  if (
    !product.title ||
    !product.description ||
    !product.code ||
    !product.price ||
    !product.stock
  ) {
    console.log("Produto com informaçoes faltando!");
    res.render("404", { message: "Produto com informaçoes faltando!" });
  }
  else{
    next();
  }
 
};

export { productValidation };
