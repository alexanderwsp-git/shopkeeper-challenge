import { Request, Response } from 'express';
import { getListingsWithRevenue } from '../service/shopkeeper-service';

export const chart = async (req: Request, res: Response) => {
    const listingsWithRevenue = await getListingsWithRevenue();
    res.render('chart', {
        title: 'Shopkeeper Chart',
        listings: JSON.parse(JSON.stringify(listingsWithRevenue)),
        listingsTable: listingsWithRevenue,
    });
};