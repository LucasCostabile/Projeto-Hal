
import express from "express";

//const path = require("path");

import prodRouter from "../routes/products.routes.js"
//import cartsRoutes from "../routes/carts.routes.js"


const app = express();
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const staticPath = path.join(`${__dirname}/../public`);
// // verificar na aula o caminho indicado no código

// app.use("/static", express.static(staticPath));

app.use("/products", prodRouter);
//app.use("/carts", cartsRoutes);

export default app;
