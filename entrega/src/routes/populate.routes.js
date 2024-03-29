import express from "express";

import { createProduct } from "../services/product.service.js";
import { title } from "process";

const populateRouter = express.Router();

//populateDB
const populateDB = async () => {
  console.log("entrei no poplate");
  const adjectives = ["Tenis", "Camiseta", "Moletom", "Relogio", "Colar"];
  const nouns = ["Nike", "Adidas", "Puma", "Perolas", "Apple"];

  function getRandomTitle() {
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  }

  function getRandomDescription() {
    const description = [
      "Grande",
      "Pequeno",
      "XL",
      "Large",
      "Azul",
      "Roxo",
      "Fussia",
      "Laranja",
    ];
    const getRandomDescription =
      description[Math.floor(Math.random() * description.length)];

    return `${getRandomDescription}`;
  }
  let product = {};
  for (let i = 0; i <= 200; i++) {
    const title = getRandomTitle();
    product = {
      title: title,
      description: `${title},${getRandomDescription()}`,
      code: `P${i + Math.floor(Math.random() * i + 1)}`,
      price: `${i * 13 + 2}`,
      stock: `${i * 16 + 6}`,
    };
    try {
      await createProduct(product);
      console.log(`Produto criado com sucesso: ${product}`);
    } catch (error) {
      console.log(error);
    }
  }
};

populateRouter.get("/", async (req, res) => {
  console.log("entrei no get");
  await populateDB();
  console.log("sai do get");
  res.render("index");
});

export { populateRouter };
