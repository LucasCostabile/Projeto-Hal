import {userLogin,criar} from "../services/usuario.service.js"

const loginUsuario = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        const login  = await userLogin(email,password);        
        
    } catch (error) {
        console.error(error);
        res.render("404");
    }
}


const createUser = async (req,res)=> {
    const user = req.body

    const userCreated = await criar(user);

    if (!userCreated){
        return res.render("404")
    }
    return res.status(200).json({message: "OK!!!"})

}


export {loginUsuario, createUser}