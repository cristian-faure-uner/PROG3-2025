import express from 'express';
import { router as v1SalonesRutas} from './v1/rutas/salonesRutas.js';
import { router as v1ReservasRutas} from './v1/rutas/reservasRutas.js';

const app = express();

app.use(express.json());
// rutas
app.use('/api/v1/salones', v1SalonesRutas);
app.use('/api/v1/reservas', v1ReservasRutas);


export default app;