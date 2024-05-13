import express from "express";
import passport from "passport";
import { createUser, loginUsuario } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.status(404).json({ message: "Nao passei pelo passport!!!" });
});

userRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/" }),
  loginUsuario
);

userRouter.post("/criaUsuario", createUser);

export default userRouter;
