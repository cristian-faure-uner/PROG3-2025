export default function autorizarUsuarios ( perfilAutorizados = [] ) {

    return (req, res, next) => {

        const usuario = req.user;

        if(!usuario || !perfilAutorizados.includes(usuario.tipo_usuario)) {
            return res.status(403).json({
                estado:"Falla",
                mesaje:"Acceso denegado."
            }) 
        }

        next();
    }
}