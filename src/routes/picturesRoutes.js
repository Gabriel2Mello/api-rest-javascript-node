import { Router } from 'express';

import pictureController from '../controllers/PictureController';

const router = new Router();

router.post('/', pictureController.store);

export default router;
