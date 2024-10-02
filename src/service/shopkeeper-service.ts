import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getListingsWithRevenue = async (startDate: string, endDate: string) => {
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
                d.listing_date >= CAST(${startDate} AS date)
                AND d.listing_date <= CAST(${endDate} AS date)
            ORDER BY 
                year, month, broker_name;
        `;
        return result;
    } catch (error) {
        console.log(`An error occours when try to get the listing data`, error)
    }
};

export const healthCheckSvc = async () => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return { status: 'ok', database: 'connected' };
    } catch (error) {
        return { status: 'error', database: 'disconnected' };
    }
};