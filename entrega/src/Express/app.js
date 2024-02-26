import express from "express";
//importando o template engine do handlebars
import { engine } from "express-handlebars";
//path e url para trabalhar com caminhos
import path from "path";
import { fileURLToPath } from "url";
//imports do socket IO para real time.
import { Server as socketIO } from "socket.io";
import http from "http";
//Import das rotas!
import prodRouter from "../routes/products.routes.js";
import cartsRoutes from "../routes/carts.routes.js";

//config dos caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config do express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config do Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//config das rotas!
app.use("/products", prodRouter);
app.use("/cart", cartsRoutes);

//confif pasta public
const staticPath = path.join(`${__dirname}/public`);
app.use("/static", express.static(staticPath));

//config do socket io
const server = http.createServer(app);
const io = new socketIO(server);

io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.on("Message", (data) => console.log(data));

  socket.emit(
    "event_individual",
    "esta mensagem deve ser recebida pelo socket"
  );
  socket.broadcast.emit("hello", "world");
});

//export do server com o express e socket juntos.
export default server;
