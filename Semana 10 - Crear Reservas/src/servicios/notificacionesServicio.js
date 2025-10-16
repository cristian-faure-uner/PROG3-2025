import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

export default class NotificacionesService {

    enviarCorreo = async (datosCorreo) => {        
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const plantillaPath = path.join(__dirname, '../utiles/handlebars/plantilla.hbs');
        const plantilla = fs.readFileSync(plantillaPath, 'utf-8');

        const template = handlebars.compile(plantilla);
        const datos = {
            fecha: datosCorreo.fecha,  
            salon: datosCorreo.salon,
            turno: datosCorreo.turno
        };
        const correoHtml = template(datos);
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.CORREO,
                pass: process.env.CLAVE
            }
        });
        
        const mailOptions = {
            // to: datosCorreo.correoElectronico,
            // cc:
            to: `cristian.faure@uner.edu.ar`,
            subject: "Nueva Reserva",
            html: correoHtml
        };

        // MERJORAR RESPUESTA!
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                res.json({'ok':false, 'mensaje':'Error al enviar el correo.'});           
            }
            res.json({'ok': true, 'mensaje': 'Correo enviado.'});
        });
    }

    // OTROS TIPOS DE NOTIFICACION
    enviarMensaje = async (datos) => {} 
    
    enviarWhatsapp = async (datos) => {} 

    enviarNotificacionPush = async (datos) => {} 

}
