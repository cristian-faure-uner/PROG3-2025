import Usuarios from "../db/usuarios.js";

export default class UsuariosService {

    constructor(){
        this.usuarios = new Usuarios();
    }

    buscar = (nombre_usuario, contrasenia) => {
        return this.usuarios.buscar(nombre_usuario, contrasenia);
    }

    buscarPorId = (usuario_id) => {
        return this.usuarios.buscarPorId(usuario_id);
    }

    modificar = async (usuario_id, datos) => {
        const existe = this.usuarios.buscarPorId(usuario_id);
        if(!existe){
            return null;
        }
        return this.usuarios.modificar(usuario_id, datos);
    }
}