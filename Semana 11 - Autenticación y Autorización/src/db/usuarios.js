import { conexion } from "./conexion.js";

export default class Usuarios{

    buscar = async (nombre_usuario, contrasenia) => {
        const sql = `SELECT u.usuario_id, CONCAT(u.nombre, ' ', u.apellido) as usuario, u.tipo_usuario
                        FROM usuarios  AS u
                        WHERE u.nombre_usuario = ? 
                            AND u.contrasenia = SHA2(?, 256) 
                            AND u.activo = 1;`
        const [result] = await conexion.query(sql, [nombre_usuario, contrasenia]);
        return result[0];
    }

    buscarPorId = async (usuario_id) => {
        const sql = `SELECT CONCAT(u.nombre, ' ', u.apellido) as usuario, u.tipo_usuario, u.usuario_id
                        FROM usuarios  AS u
                        WHERE u.usuario_id = ? AND u.activo = 1;`
        const [result] = await conexion.query(sql, [usuario_id]);
        return result[0];
    }
}