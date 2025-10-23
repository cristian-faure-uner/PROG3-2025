import Reservas from "../db/reservas.js";
import ReservasServicios from "../db/reservas_servicios.js";
import NotificacionesService from "./notificacionesServicio.js";

export default class ReservasServicio {

    constructor(){
        this.reserva = new Reservas();
        this.reservas_servicios = new ReservasServicios();
        this.notificacioes_servicios = new NotificacionesService();
    }
    
    buscarTodos = (usuario) => {

        if(usuario.tipo_usuario < 3){
            return this.reserva.buscarTodos();
        }else{
            return this.reserva.buscarPropias(usuario.usuario_id);
        }

    }

    buscarPorId = (reserva_id) => {
        return this.reserva.buscarPorId(reserva_id);
    }

    crear = async (reserva) => {
        
        const {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero, 
            tematica,
            importe_salon,
            importe_total,
            servicios } = reserva;

        const nuevaReserva = {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero, 
            tematica,
            importe_salon,
            importe_total
        }    

        // SOLO CREO LA RESERVA
        const result = await this.reserva.crear(nuevaReserva);

        if (!result) {
            return null;
        }

        // CREO LAS RELACIONES RESERVAS-SERVICIOS
        await this.reservas_servicios.crear(result.reserva_id, servicios);     
        
        // ENVIO NOTIFICACION 
        try {
            // BUSCO LOS DATOS PARA LA NOTIFICACION, LEYENDO DESDE LA BASE DE DATOS (DATOS CREADOS)
            const datosParaNotificacion = await this.reserva.datosParaNotificacion(result.reserva_id);
        
            await this.notificacioes_servicios.enviarCorreo(datosParaNotificacion);
        } catch (notificationError) {            
            console.log('Advertencia: No se pudo enviar el correo.');
        }

        // RETORNO LA RESERVA CREADA
        return this.reserva.buscarPorId(result.reserva_id);
    }
}