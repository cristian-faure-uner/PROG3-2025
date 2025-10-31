import { createObjectCsvWriter } from 'csv-writer';
import puppeteer, { Browser } from "puppeteer";
import handlebars from 'handlebars';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InformeServicio {
    
    informeReservasCsv = async (datosReporte) => {
        try{
            let ruta = path.resolve(__dirname, '../utiles');
            ruta = path.join(ruta, 'reservas.csv'); 

            const csvWriter = createObjectCsvWriter({
                path: ruta,
                header: [
                    {id: 'fecha_reserva', title: 'Fecha reserva'},
                    {id: 'titulo', title: 'Título'},
                    {id: 'orden', title: 'Orden'}
                ]
            });
            
            await csvWriter.writeRecords(datosReporte);
            return ruta;
            
        }catch (error){
            console.log(`Error generando csv ${error}`);
        }
    }

    informeReservasPdf = async (datosReporte) => {
        try{
            const plantillaPath  = path.join(__dirname, '../utiles/handlebars/informe.hbs');
            const plantillaHtml = fs.readFileSync(plantillaPath , 'utf8');
            
            const template = handlebars.compile(plantillaHtml);
            
            const htmlFinal = template(
                {
                    reservas: datosReporte
                }
            );
            
            let browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            let page = await browser.newPage();
            await page.setContent(htmlFinal);

            const buffer = await page.pdf({
                path: 'reservas.pdf', 
                format: 'A4', 
                printBackground: true
            });

            await browser.close();

            return buffer;

        }catch(error){
            console.error('Error generando el PDF:', error);
            throw error;
        }
    }

}


