import { Router } from 'express';
import { getDeals }  from '../controllers/deals-controller';

const router: Router = Router();

router.get('/', getDeals);

export default router;