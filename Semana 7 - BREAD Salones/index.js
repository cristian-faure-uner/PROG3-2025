import express from 'express';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath} from 'url';
import { readFile } from 'fs/promises';
import path from 'path';
import { conexion } from './db/conexion.js';

// instancia express
const app = express();

// las solicitus con un body las interpretamos como JSON
app.use(express.json());

// ruta del estado de api, sería como ver si esta activa la aplicación
app.get('/estado', (req, res) => {
    res.json({'ok':true});    
})

// ruta tipo POST, por ahora recibe datos, la completaremos con el envio de un correo electrónico
app.post('/notificacion', async (req, res) => {

    if(!req.body.fecha ||  !req.body.salon || !req.body.turno || !req.body.correoDestino){
        res.status(400).send({'estado':false, 'mensaje':'Faltan datos requeridos!'});
    }
    
    try{
        // obtengo los datos del cuerpo de la consulta, desestructurando
        const { fecha, salon, turno, correoDestino} = req.body;

        // necesito la ubicación de la plantilla, obtengo la ruta absoluta del archivo
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);        
        const plantilla = path.join(__dirname, 'utiles', 'handlebars', 'plantilla.hbs');

        // leo la plantilla handlebars, compilo y le paso los datos que llegaron
        const archivoHbs = await readFile(plantilla, 'utf-8');

        const template = handlebars.compile(archivoHbs);

        var html = template(
            {   fecha: fecha, 
                salon: salon,
                turno: turno
            }
        );
        

        // servicio, usuario y password para el envio de correo electrónico
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        // las opciones para el envio, importante "html" (handlebars)
        const opciones = {
            to: correoDestino,
            subject: 'Notificación',
            html: html
        }

        // envío el correo electrónico
        transporter.sendMail(opciones, (error, info) => {
            if(error){
                res.json({'ok':false, 'mensaje':'Error al enviar el correo.'});           
            }
            res.json({'ok': true, 'mensaje': 'Correo enviado.'});
        });

    }catch (error){
        console.log(error);
    }
})

// ruta  GET para obtener todos los salones
app.get('/salones', async(req, res) => {
    try {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        
        // la ejecución de la consulta nos devuelve: el resultado de la consulta e información sobre la consulta
        // metadatos de la consulta: ejemplo información del id creado
        const [results, fields] = await conexion.query(sql);

        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available

        res.json({'ok':true, 'salones':results});

    } catch (err) {
        console.log(err);
    }
})

// ruta GET para obtener 1 salón, recibe como parametro el id del salon que quiere consultar el cliente
// utiliza sentencias preparadas
app.get('/salones/:salon_id', async(req, res) => {
    try {
        
        const salon_id = req.params.salon_id;
        const sql = `SELECT * FROM salones WHERE activo = 1 and salon_id = ?`;
        const valores = [salon_id];

        const [results, fields] = await conexion.execute(sql, valores);

        if(results.length === 0){
            return res.status(404).json({
                estado: false,
                mensaje: 'Salón no encontrado.'
            })
        }

        res.json({
            estado: true,
            salon: results[0]
        });

    } catch (err) {
        console.log('Error en GET /salones/:salon_id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor.'
        })
    }
})

// ruta para crear un salón
app.post('/salones', async (req, res)=>{    
    try{

        // CONTROL DE DATOS REQUERIDOS
        if(!req.body.titulo || !req.body.direccion || !req.body.capacidad || !req.body.importe){
            return res.status(400).json({
                estado: false,
                mensaje: 'Faltan campos requeridos.'
            })
        }
        const {titulo, direccion, capacidad, importe} = req.body;
        
        // valores que se reemplazarán por los signos de ?
        const valores = [titulo, direccion, capacidad, importe];
        const sql = 'INSERT INTO salones (titulo, direccion, capacidad, importe) VALUES (?,?,?,?)';

        const [result]= await conexion.execute(sql, valores);
        
        res.status(201).json({
            estado: true,
            mensaje: `Salón creado con id ${result.insertId}.`
        })

    }catch (err) {
        console.log('Error en POST /salones', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor.'
        })
    }

})

// ruta para editar un salón
app.put('/salones/:salon_id', async (req, res) => {
    try{
        // antes de modificar verifico si id corresponde a un salón existente en la bd
        const salon_id = req.params.salon_id;
        const sql = `SELECT * FROM salones WHERE activo = 1 and salon_id = ?`;
                
        const [results] = await conexion.execute(sql, [salon_id]);
                
        // sino existe aviso al cliente
        if(results.length === 0){
            return res.status(404).json({
                estado: false,
                mensaje: 'El salón no existe.'
            })
        }

        if(!req.body.titulo || !req.body.direccion || !req.body.capacidad || !req.body.importe){
            return res.status(400).json({
                estado: false,
                mensaje: 'Faltan campos requeridos.'
            })
        }
        
        const {titulo, direccion, capacidad, importe} = req.body;
        
        const valores = [titulo, direccion, capacidad, importe, salon_id];
        const sql2 = `UPDATE salones 
                        SET titulo = ?, direccion = ?, capacidad = ? , importe = ? 
                        WHERE salon_id = ?`;

        const [result]= await conexion.execute(sql2, valores);

        res.status(200).json({
            estado: true,
            mensaje: `Salón modificado.`
        });
    }catch(err) {
        console.log('Error en PUT /salones/:salon_id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor.'
        })
    }
});

// ruta para eliminiar un salón
// eliminación lógica
app.delete('/salones/:salon_id', async (req, res) => {
    try{
        const salon_id = req.params.salon_id;
        const sql = `SELECT * FROM salones WHERE activo = 1 and salon_id = ?`;
                
        const [results] = await conexion.execute(sql, [salon_id]);
        
        if(results.length === 0){
            return res.status(404).json({
                estado: false,
                mensaje: 'El salón no existe.'
            })
        }

        const sql2 = `UPDATE salones 
                        SET activo = 0 
                        WHERE salon_id = ?`;

        const [result]= await conexion.execute(sql2, [salon_id]);
        
        res.status(200).json({
            estado: true,
            mensaje: `Salón eliminado.`
        });
    }catch(err) {
        console.log('Error en DELETE /salones/:salon_id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor.'
        })
    }
});



// cargo las varibales de entorno
process.loadEnvFile();

// lanzo mi servidor express
app.listen(process.env.PUERTO, () => {
    console.log(`Servidor iniciado en ${process.env.PUERTO}`);
})