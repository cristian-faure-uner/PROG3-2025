import express from 'express';

// instancia express
const app = express();

// las solicitus con un body las interpretamos como JSON
app.use(express.json());

// ruta del estado de api, sería como ver si esta activa la aplicación
app.get('/estado', (req, res) => {
    res.json({'ok':true});    
})

// ruta tipo POST, por ahora recibe datos, la completaremos con el envio de un correo electrónico
app.post('/notificacion', (req, res) => {

    console.log(req.body);
    
    if(!req.body.fecha ||  !req.body.salon || !req.body.turno || !req.body.correoDestino){
        res.status(400).send({'estado':false, 'mensaje':'Faltan datos requeridos!'});
    }
    
    res.json({'ok':true});
})

// cargo las varibales de entorno
process.loadEnvFile();
// console.log(process.env.PUERTO);

// lanzo mi servidor express
app.listen(process.env.PUERTO, () => {
    console.log(`Servidor iniciado en ${process.env.PUERTO}`);
})