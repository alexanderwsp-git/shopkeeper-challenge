import { PrismaClient } from '@prisma/client';
import JSONbig from 'json-bigint';

const prisma = new PrismaClient();

export const getListingsWithRevenue = async () => {
    try {
        const result = await prisma.$queryRaw`
            SELECT 
                d.id AS listing_id,
                EXTRACT(YEAR FROM d.listing_date) AS year,
                EXTRACT(MONTH FROM d.listing_date) AS month,
                d.listing_date,
                s.title AS broker_name,
                d.revenue
            FROM 
                deals d
            JOIN 
                sites s ON d.site_id = s.id
            WHERE 
                d.listing_date BETWEEN '2020-11-01' AND '2021-11-30'
            ORDER BY 
                year, month, broker_name;
        `;
        return JSONbig.stringify(result);
    } catch (error) {
        console.log(`An error occours when try to get the listing data`)
    }
};