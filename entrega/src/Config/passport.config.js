import passport from "passport"
import passportLocal from "passport-local"
import jwt from "passport-jwt"
import { usuarioModel } from "../DB/Mongo/models/usuarioModel.js"
import {validatePassword} from "../Utils/index.utils.js"
import {generateToken} from "../Utils/jwt.utils.js"


const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieStractor = (req) => {
    let token = null;
    if (req && req.cookies){
        return(token = req.cookies["accessToken"]);
    }
}

const initializePassport = () => {
        passport.use("jwt",new JWTStrategy(
            {   jwtFromRequest: ExtractJWT.fromExtractors([cookieStractor]),
                secretOrKey: process.env.SECRET,
            },
        async (jwt_payload,done) => {
            try {
                return done(null,jwt_payload)
            } catch (error) {
                return done(error)
            }
        }))

    passport.use("login",
        new passportLocal.Strategy(
            {usernameField: "email"},
            async (email,password,done) => {
                try{
                    console.log("EMAIL DO LOGIN!!!!!",email);
                    const userFound = await usuarioModel.findOne({email: email});
                    console.log("/USER DO MONGO", userFound)
                    if(!userFound){
                        return done(null, false)
                    }
                    const testPassword = await validatePassword(password,userFound)
                    console.log("passei na validaçao de senha",testPassword);
                    if(testPassword){
                        let user = [userFound];
                        user = user.map(u => u.toJSON() )
                        console.log("user", user);
                        delete user[0].password;
                        console.log("deu ruim aqui? ")
                        const accessToken = generateToken(user[0]);
                        console.log("gerei o token!!", accessToken)
                        user[0].token = accessToken;

                        return done(null,user[0]);
                    }else{
                        return done(null,false)
                    }

                }catch(error){
                    console.error(error);
                    return done(`Erro ao obter user ${error}`)
                }
            }
        )
    )


    passport.serializeUser((user,done)=> done(null, user._id));

    passport.deserializeUser(async (id,done) => {
        try {
            const user = await usuarioModel.findById(id);
            done(null,user);
        }catch(error){
            done(`Erro ao obter user ${error}` )
        }
    })

};




export {initializePassport} 

 