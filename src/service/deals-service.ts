import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDeals = async() => {
  const deals = await prisma.deals.findMany();
  return deals;
}