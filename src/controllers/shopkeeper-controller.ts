import { Request, Response } from 'express';
import { getListingsWithRevenue, healthCheckSvc } from '../service/shopkeeper-service';

export const shopkeeper = async (req: Request, res: Response) => {
    res.render('shopkeeper', {
        title: 'Listings Per Month by Broker',
        _ListingsApiURL: process.env.API_SHOPKEEPER_LISTEINGS
    });
};

export const listings = async (req: Request, res: Response) => {
    const startDate = req.query.startDate as string | undefined;
    const endDate = req.query.endDate as string | undefined;
    if (!startDate || !endDate) {
        res.status(400).json({ error: 'startDate and endDate are required' });
        return;
    }
    const listingsWithRevenue = await getListingsWithRevenue(startDate, endDate);
    res.status(200).json({ listings: listingsWithRevenue });
};

export const healthCheck = async (req: Request, res: Response) => {
    const healthCheck = await healthCheckSvc();
    if ('error' === healthCheck.status) {
        res.status(500).json(healthCheck);
    }
    res.status(200).json(healthCheck);
};