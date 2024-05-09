import express from "express"
import {createUser, loginUsuario} from "../controllers/user.controller.js"
import { criar } from "../services/usuario.service.js";
import bcrypt from "bcrypt"


const userRouter = express.Router();



userRouter.get("/",(req,res)=> {
    res.render("login")
})

userRouter.post("/login", loginUsuario)

userRouter.post("/criaUsuario", createUser)



export default userRouter;