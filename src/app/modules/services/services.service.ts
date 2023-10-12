/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Service } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../shared/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import {
  servicesRelationalFields,
  servicesRelationalFieldsMapper,
  servicesSearchableFields,
} from './services.constants';
import { IServiceFilterRequest } from './services.interface';

const insertIntoDb = async (serviceData: Service): Promise<Service> => {
  const result = await prisma.service.create({ data: serviceData });
  return result;
};
const getAllFromDb = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[] | null>> => {
  const { searchTerm, ...filterData } = filters;

  const { page, size, skip, sortBy, sortOrder, maxPrice, minPrice } =
    paginationHelper.calculatePagination(options);

  const andConditions = [];

  if (maxPrice) {
    andConditions.push({
      price: {
        lte: maxPrice,
      },
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        gte: minPrice,
      },
    });
  }
  if (searchTerm) {
    andConditions.push({
      OR: servicesSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (servicesRelationalFields.includes(key)) {
          return {
            [servicesRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const total = await prisma.service.count({ where: whereConditions });
  const totalPage = Math.ceil(total / size);
  const result = await prisma.service.findMany({
    take: size,
    skip,
    where: whereConditions,
    include: {
      category: true,
    },
    orderBy:
      sortBy && sortBy
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: 'desc' },
  });
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

export const ServicesService = { insertIntoDb, getAllFromDb };
