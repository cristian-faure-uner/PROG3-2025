import express from 'express';
import apicache from 'apicache';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import SalonesControlador from '../../controladores/salonesControlador.js';

const salonesControlador = new SalonesControlador();

const router = express.Router();
let cache = apicache.middleware

router.get('/', cache('5 minutes'), salonesControlador.buscarTodos); 
router.get('/:salon_id', salonesControlador.buscarPorID);
router.put('/:salon_id', salonesControlador.modificar);
router.post('/', 
    [
        check('titulo', 'El título es necesario.').notEmpty(),
        check('direccion', 'La dirección es necesaria.').notEmpty(),
        check('capacidad', 'La capacidad es necesaria.').notEmpty(),
        check('importe', 'El importe es necesario.').notEmpty(), 
        validarCampos    
    ],
    salonesControlador.crear);

// router.delete('/:salon_id'); // tarea para completar

export { router };