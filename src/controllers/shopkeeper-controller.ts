import { Request, Response } from 'express';
import { getListingsWithRevenue } from '../service/shopkeeper-service';

export const chart = async(req: Request, res: Response) => {
    const listingsWithRevenue = await getListingsWithRevenue();
    console.log(listingsWithRevenue);
    res.render('chart', {
        title: 'My Chart Example',
        chartData: JSON.stringify([12, 19, 3, 5, 2, 3]),
    });
};