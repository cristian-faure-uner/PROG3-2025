import Reservas from "../db/reservas.js";
import ReservasServicios from "../db/reservas_servicios.js";
import NotificacionesServicio from "./notificacionesServicio.js";
import InformeServicio from "./informesServicio.js";



export default class ReservasServicio {

    constructor(){
        this.reserva = new Reservas();
        this.reservas_servicios = new ReservasServicios();
        this.notificacioes_servicios = new NotificacionesServicio();
        this.informes = new InformeServicio();
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

        const result = await this.reserva.crear(nuevaReserva);

        if (!result) {
            return null;
        }

        await this.reservas_servicios.crear(result.reserva_id, servicios);     
        
        try {
            const datosParaNotificacion = await this.reserva.datosParaNotificacion(result.reserva_id);
        
            await this.notificacioes_servicios.enviarCorreo(datosParaNotificacion);
        } catch (notificationError) {            
            console.log('Advertencia: No se pudo enviar el correo.');
        }

        return this.reserva.buscarPorId(result.reserva_id);
    }


    generarInforme = async (formato) => {
        if (formato === 'pdf') {

            const datosReporte = await this.reserva.buscarDatosReporteCsv();

            const pdf = await this.informes.informeReservasPdf(datosReporte);
            
            return {
                buffer: pdf,
                headers:{
                    'Content-Type' : 'application/pdf',
                    'Content-Dispositon' : 'inline; filename = "reporte3010.pdf"'
                }
            }

        }else if (formato === 'csv'){
            
            const datosReporte = await this.reserva.buscarDatosReporteCsv();

            const csv =  await this.informes.informeReservasCsv(datosReporte);
            
            return {
                path: csv,
                headers:{
                    'Content-Type' : 'text/csv',
                    'Content-Dispositon' : 'attachment; filename = "reporte.csv"'
                }
            }

        }
    }

}