import prisma from './db';

export const createErrand = async (data: {
  title: string;
  description: string;
  deadline: Date;
  location: string;
  reward: number;
  creatorId: string;
  tags: string[];
}) => {
  return prisma.errand.create({
    data: {
      ...data,
      tags: {
        connectOrCreate: data.tags.map(tag => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: {
      creator: true,
      taker: true,
      tags: true,
    },
  });
};

export const getErrands = async () => {
  return prisma.errand.findMany({
    include: {
      creator: true,
      taker: true,
      tags: true,
    },
  });
};

export const takeErrand = async (errandId: string, takerId: string) => {
  return prisma.errand.update({
    where: { id: errandId },
    data: {
      status: 'in-progress',
      taker: {
        connect: { id: takerId },
      },
    },
  });
};