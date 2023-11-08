import express from 'express';
import controller from '../controllers/Asignatura';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.asignatura.create), controller.createAsignatura);
router.get('/:asignaturaId', controller.readAsignatura);
router.get('/', controller.dameTodo);
router.get('/page/:page/:limit', controller.readAll);
router.get('/user/:id', controller.getAsignaturasOfUser);
router.put('/:asignaturaId', ValidateSchema(Schemas.asignatura.update), controller.updateAsignatura);
router.delete('/:asignaturaId', controller.deleteAsignatura);

export = router;
