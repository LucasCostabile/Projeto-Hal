import { userLogin, criar } from "../services/usuario.service.js";

const loginUsuario = async (req, res) => {
  console.log("passei na validacao do passport");
  if (!req.user) {
    return res.status(400).json({ status: "error", message: "Unathorized" });
  }

  const user = {
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    token: req.user.token,
  };

  req.session.user = user;

  return res.status(200).json(user);
  //return res.cookie("accessToken", req.user.token).redirect("/products/home")
};

const createUser = async (req, res) => {
  const user = req.body;

  const userCreated = await criar(user);

  if (!userCreated) {
    return res.render("404");
  }
  return res.status(200).json({ message: "OK!!!" });
};

export { loginUsuario, createUser };
