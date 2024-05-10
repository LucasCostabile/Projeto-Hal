import express from "express"
import passport from "passport"
import {createUser, loginUsuario} from "../controllers/user.controller.js"

const userRouter = express.Router();


userRouter.get("/",(req,res)=> {
    res.render("login")
})

userRouter.post("/login", passport.authenticate("login", {failureRedirect: "/login" }) ,loginUsuario)

userRouter.post("/criaUsuario", createUser)



export default userRouter;