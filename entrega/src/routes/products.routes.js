import express from "express";
import {create,getAll,getById} from "../controllers/products.controller.js"
const prodRouter = express.Router();

prodRouter.get("/", getAll);

prodRouter.get("/:pid",getById );

prodRouter.post("/", create);

prodRouter.put("/:id", );

prodRouter.delete("/:id", );

export default prodRouter;