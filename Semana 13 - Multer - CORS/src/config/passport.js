import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalSrategy } from "passport-local";

import UsuariosService from "../servicios/usuariosService.js";

const estrategia = new LocalSrategy({
    usernameField: 'nombre_usuario', 
    passwordField: 'contrasenia'
}, 
    async (nombre_usuario, contrasenia, done) => {
        try{
            const usuariosServicio = new UsuariosService();
            const usuario = await usuariosServicio.buscar(nombre_usuario, contrasenia);
            if(!usuario){
                return done(null, false, { mensaje: 'Login incorrecto!'})
            }
            return done(null, usuario, { mensaje: 'Login correcto!'})
        }
        catch(exc){
            done(exc);
        }
    }
)

const validacion = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET    
},
    async (jwtPayload, done) => {
        const usuariosServicio = new UsuariosService();
        const usuario = await usuariosServicio.buscarPorId(jwtPayload.usuario_id);
        if(!usuario){
            return done(null, false, { mensaje: 'Token incorrecto!'});
        }

        return done(null, usuario); 
    }    
)
export { estrategia, validacion };