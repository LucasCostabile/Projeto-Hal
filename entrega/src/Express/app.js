//import do express
import express from "express";
//importando o template engine do handlebars
import { engine } from "express-handlebars";
//path e url para trabalhar com caminhos
import path from "path";
import { fileURLToPath } from "url";

//import da classe para conexao com mongoDB
import mongoDBConection from "../DB/Mongo/mongoConnect.js";

const mongoDBconect = await mongoDBConection();
mongoDBconect.on("error", (error) => {
  console.log(`Erro ao conectar no MongoDB!! Erro: ${error}`);
});
mongoDBconect.once("open", () => {
  console.log("Conexão feita com sucesso!!");
});

//imports do socket IO para real time.
import { Server as socketIO } from "socket.io";
import http from "http";
//Import das rotas!
import prodRouter from "../routes/products.routes.js";
import cartsRoutes from "../routes/carts.routes.js";
import { populateRouter } from "../routes/populate.routes.js";

//config dos caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config do express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//confif pasta public
const staticPath = path.join(`${__dirname}/../public`);
app.use(express.static(staticPath));

//config do Handlebars
const pathView = path.resolve(`${__dirname}/../views/`);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", pathView);

//config das rotas!
app.use("/products", prodRouter);
app.use("/cart", cartsRoutes);
app.use("/populate", populateRouter);

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

// const cretateArray = () => {
//   const arr = [];
//   for (let i = 0; i >= 19; i++) {}
// };

// function generateRandomArray() {
//   const randomArray = [];
//   while (randomArray.length < 20) {
//     const randomNum = Math.floor(Math.random() * 100) + 1;
//     if (!arr.includes(randomNum)) {
//       arr.push(randomNum);
//     }
//   }

//   const max = Math.max(...randomArray);
//   const min = Math.min(...randomArray);
//   return { max, min };
// }
