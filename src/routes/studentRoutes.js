import { Router } from 'express';
import studentController from '../controllers/StudentController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router;

router.get('/', studentController.getAll);
router.get('/:id', studentController.get);

router.post('/', loginRequired, studentController.create);
router.put('/:id', loginRequired, studentController.update);
router.delete('/:id', loginRequired, studentController.delete);

export default router;
