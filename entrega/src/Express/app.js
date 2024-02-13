const express = require("express");

const path = require("path");

const productsRoutes = require("../routes/productsRoute.ts");
const cartsRoutes = require("../routes/cartsRoute.ts");

const app = express();
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const staticPath = path.join(`${__dirname}/../public`);
// // verificar na aula o caminho indicado no código

// app.use("/static", express.static(staticPath));

app.use("/products", productsRoutes);
app.use("/carts", cartsRoutes);

module.exports = app;
