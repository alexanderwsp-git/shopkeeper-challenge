import { Router } from 'express';
import { chart } from '../controllers/shopkeeper-controller';

const router: Router = Router();

router.get('/', chart);

export default router;