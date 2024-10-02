import { Router } from 'express';
import { shopkeeper } from '../controllers/shopkeeper-controller';

const router: Router = Router();

router.get('/', shopkeeper);

export default router;