import { Service } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createService = async (serviceData: Service): Promise<Service> => {
  const result = await prisma.service.create({ data: serviceData });
  return result;
};

export const ServicesService = { createService };
