import { usuarioModel } from "../DB/Mongo/models/usuarioModel.js";
import { hashPassword, validatePassword } from "../Utils/index.utils.js";

const userLogin = async (email, password) => {};

const criar = async ({ name, email, password, role }) => {
  const hashedPassword = await hashPassword(password);
  try {
    const usr = await usuarioModel.create({
      name,
      email,
      hashedPassword,
      role,
    });
    return usr;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { userLogin, criar };
