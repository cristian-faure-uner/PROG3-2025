import express from 'express';
// PASSPORT 
import passport from 'passport';
import morgan from 'morgan';
import fs from 'fs';

import { estrategia, validacion} from './config/passport.js';

import { router as v1SalonesRutas} from './v1/rutas/salonesRutas.js';
import { router as v1ReservasRutas} from './v1/rutas/reservasRutas.js';
import { router as v1AuthRouter} from './v1/rutas/authRoutes.js';

const app = express();

// middlewares 
app.use(express.json());
// CONFIGURACION PASSPORT
passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

// morgan
let log = fs.createWriteStream('./access.log', { flags: 'a' })
app.use(morgan('combined')) // en consola
app.use(morgan('combined', { stream: log })) // en el archivo


// rutas
app.use('/api/v1/auth', v1AuthRouter); // AUTENTICACIÓN
app.use('/api/v1/salones', v1SalonesRutas);

// AHORA LA RUTA REQUIERE DE AUTENTICACIÓN
app.use('/api/v1/reservas', passport.authenticate( 'jwt', { session:false }), v1ReservasRutas);

export default app;