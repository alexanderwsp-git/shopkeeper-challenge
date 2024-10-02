import { Router } from 'express';
import { healthCheck, listings } from '../controllers/shopkeeper-controller';

const router: Router = Router();

router.get('/listings', listings);
router.get('/healthz', healthCheck);

export default router;