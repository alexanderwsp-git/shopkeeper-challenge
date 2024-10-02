import { Request, Response } from 'express';
import * as DealsService from '../service/deals-service';

export const getDeals = async (req: Request, res: Response) => {
  const deals = await DealsService.getDeals();
  res.status(200).json(deals);
}