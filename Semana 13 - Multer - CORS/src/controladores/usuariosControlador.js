import UsuariosService from "../servicios/usuariosService.js";

export default class UsuariosControlador{

    constructor(){
        this.usuariosServicio = new UsuariosService();
    }
    
    modificar = async (req, res) => {
        try {
            const usuario_id = req.params.usuario_id;

            const foto  = req.file ? req.file.filename : null; 
            const datos = { ...req.body, foto}; 

            const modificado = await this.usuariosServicio.modificar(usuario_id, datos);

            if (!modificado) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'Usuario no encontrado para ser modificado.'
                })
            }

            res.json({
                estado: true, 
                mensaje: 'Usuario modificado!',
                salon: modificado
            });
    
        } catch (err) {
            console.log('Error en PUT /usuarios/:usuario_id', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        }
    }
}