import { userLogin, criar } from "../services/usuario.service.js";

import {createNewUser} from "../services/usuario.service.js"

const getAccess= async(req, res,)=>{

    try {
        let userName = "";
        if (req.user) {
          userName = req.user.name;
        }
      await  res.render("home", { user: req.user, userName});
    
      } catch (error) {
        console.log(error);
      }

}

const getLogin=async(req,res)=>{
  res.render("login",{user:req.user})
}

const controlRegister= async(req,res)=>{
    let isAdmin="";
    let userName="";
    if (req.user) {
        if(req.user.role==="admin"){
     isAdmin= req.user.role;
     userName= req.user.name;
        }
        
      
    }
  await  res.render("register",{isAdmin: isAdmin, userName: userName});
  console.log(userName);
  
}


const loginUsuario = async(req, res) => {
    console.log("passei na validacao do passport")
    if(!req.user){
        return res.status(400).json({ status: "error" , message: "Unathorized"})
    }
     const user = {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        token: req.user.token
    }
    req.session.user = user
    return res.cookie("accessToken", req.user.token).redirect("/")
}

  return res.status(200).json(user);
  //return res.cookie("accessToken", req.user.token).redirect("/products/home")
};


const postCreatUser = async (req,res)=> {
    const userData = req.body
    const userCreated = await createNewUser(userData);
    if (!userCreated){
        return res.render("404")
    }
    return res.status(200).json({message: "OK!!!"})
}

const logoutUsuario= async(req,res)=>{
    req.session.destroy((err) => {
        if (!err)
          res.clearCookie("connect.sid").redirect("/");
        else res.send({ status: "Erro ao efetuar logout", body: err });
      });

}

export {loginUsuario, postCreatUser,logoutUsuario,getAccess,controlRegister,getLogin};

