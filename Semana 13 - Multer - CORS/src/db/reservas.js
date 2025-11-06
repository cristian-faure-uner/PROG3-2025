import { conexion } from "./conexion.js";

export default class Reservas {

    buscarPropias = async(usuario_id) => {
        const sql = 'SELECT * FROM reservas WHERE activo = 1 AND usuario_id = ?';
        const [reservas] = await conexion.execute(sql, [usuario_id]);
        return reservas;
    }
    
    buscarTodos = async() => {
        const sql = 'SELECT * FROM reservas WHERE activo = 1';
        const [reservas] = await conexion.execute(sql);
        return reservas;
    }

    buscarPorId = async(reserva_id) => {
        const sql = 'SELECT * FROM reservas WHERE activo = 1 AND reserva_id = ?';
        const [reserva] = await conexion.execute(sql, [reserva_id]);
        if(reserva.length === 0){
            return null;
        }

        return reserva[0];
    }

    crear = async(reserva) => {
        const {
                fecha_reserva,
                salon_id,
                usuario_id,
                turno_id,
                foto_cumpleaniero, 
                tematica,
                importe_salon,
                importe_total 
            } = reserva;
        
        const sql = `INSERT INTO reservas 
            (fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total) 
            VALUES (?,?,?,?,?,?,?,?)`;
        
        const [result] = await conexion.execute(sql, 
            [fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total]);

        if (result.affectedRows === 0){
            return null;
        }

        return this.buscarPorId(result.insertId);
    }

    
    datosParaNotificacion = async(reserva_id) => {
        const sql = `CALL obtenerDatosNotificacion(?)`;
        
        const [reserva] = await conexion.execute(sql, [reserva_id]);
        if(reserva.length === 0){
            return null;
        }

        return reserva;
    }

    buscarDatosReporteCsv = async() => {
        const sql = `CALL reporte_csv()`;
        const [result] = await conexion.query(sql);
        return result[0];
    }
}