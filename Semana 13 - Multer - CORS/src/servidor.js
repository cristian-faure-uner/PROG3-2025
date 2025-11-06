import app from './reservas.js';

process.loadEnvFile();

app.listen(process.env.PUERTO, () => {
    console.log(`Servidor iniciado en ${process.env.PUERTO}`);
})