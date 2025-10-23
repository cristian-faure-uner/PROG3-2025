// CONTROLO SI EL TIPO DE USUARIO ESTA AUTORIZADO O NO EN EL ARRAY DE PERFILES PERMITIDOS PARA EL RECURSO
export default function autorizarUsuarios ( perfilAutorizados = [] ) {

    return (req, res, next) => {

        const usuario = req.user;

        if(!usuario || !perfilAutorizados.includes(usuario.tipo_usuario)) {
            return res.status(403).json({
                estado:"Falla",
                mesaje:"Acceso denegado."
            }) // NO ESTA INCLUIDO
        }

        next(); // ESTA INCLUIDO, CONTINUA CON EL METODO DEL CONTROLADOR
    }
}