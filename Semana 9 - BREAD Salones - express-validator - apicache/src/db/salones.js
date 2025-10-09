import { conexion } from "./conexion.js";

export default class Salones {

    buscarTodos = async() => {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [salones] = await conexion.execute(sql);

        return salones;
    }

    buscarPorId = async(salon_id) => {
        const sql = 'SELECT * FROM salones WHERE activo = 1 AND salon_id = ?';
        const [salon] = await conexion.execute(sql, [salon_id]);

        if(salon.length === 0){
            return null;
        }

        return salon[0];
    }

    crear = async(salon) => {
        const {titulo, direccion, capacidad, importe} = salon;
        const sql = 'INSERT INTO salones (titulo, direccion, capacidad, importe) VALUES (?,?,?,?)';
        const [result] = await conexion.execute(sql, [titulo, direccion, capacidad, importe]);

        if (result.affectedRows === 0){
            return null;
        }

        return this.buscarPorId(result.insertId);
    }

    modificar = async(salon_id, datos) => {
        // obtengo claves y valores de los datos a modificar
        const camposAActualizar = Object.keys(datos);
        const valoresAActualizar = Object.values(datos);

        // armo la parte SET de la instruccion SQL: "titulo = ?, direccion = ?, ..."
        const setValores = camposAActualizar.map(campo => `${campo} = ?`).join(', ');

        // array de parámetros 
        const parametros = [...valoresAActualizar, salon_id];

        // SQL final
        const sql = `UPDATE salones SET ${setValores} WHERE salon_id = ?`;
        
        const [result] = await conexion.execute(sql, parametros);

        if (result.affectedRows === 0){
            return null;
        }

        return this.buscarPorId(salon_id);
    }
    
    // completar
    eliminar = async() => {
    }
    
}