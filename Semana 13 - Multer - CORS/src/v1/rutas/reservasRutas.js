import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';
import ReservasControlador from '../../controladores/reservasControlador.js';

const reservasControlador = new ReservasControlador();
const router = express.Router();

router.get('/informe', autorizarUsuarios([1]), reservasControlador.informe);  

router.get('/:reserva_id',  autorizarUsuarios([1,2,3]), reservasControlador.buscarPorId);

router.get('/',  autorizarUsuarios([1,2,3]), reservasControlador.buscarTodos);

router.post('/', autorizarUsuarios([1,3]),
    [
        check('fecha_reserva', 'La fecha es necesaria.').notEmpty(),
        check('salon_id', 'El salón es necesario.').notEmpty(),
        check('usuario_id', 'El usuario es necesario.').notEmpty(), 
        check('turno_id', 'El turno es necesario.').notEmpty(),  
        check('servicios', 'Faltan los servicios de la reserva.')
        .notEmpty()
        .isArray(),
        check('servicios.*.importe')
        .isFloat() 
        .withMessage('El importe debe ser numérico.'),   
        validarCampos
    ],
    reservasControlador.crear);



export { router };