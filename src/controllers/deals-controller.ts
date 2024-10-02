import { Request, Response } from 'express';
import  * as DealsService from '../service/deals-service';
//   import JSONbig from 'json-bigint';
// res.send(JSONbig.stringify(deals));

export const getDeals = async(req: Request, res: Response) => {
    const deals = await DealsService.getDeals();
    res.status(200).json(deals);
}