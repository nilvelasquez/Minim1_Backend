import express from 'express';
import controller from '../controllers/Faq';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.faq.create), controller.createFaq);
router.get('/:faqId', controller.readFaq);
router.get('/', controller.dameTodo);
router.get('/page/:page/:limit', controller.readAll);
router.put('/:faqId', ValidateSchema(Schemas.faq.update), controller.updateFaq);
router.delete('/:faqId', controller.deleteFaq);

export = router;