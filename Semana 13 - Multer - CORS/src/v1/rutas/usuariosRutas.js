import express from 'express';
import multer from 'multer';
import { storage } from '../../config/multer.js';

import UsuariosControlador from '../../controladores/usuariosControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const usuariosControlador = new UsuariosControlador();

const upload = multer({ storage });

const router = express.Router();

router.put('/:usuario_id', upload.single('foto'), autorizarUsuarios([3]), usuariosControlador.modificar);

export { router };