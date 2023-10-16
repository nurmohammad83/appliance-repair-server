import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import bcrypt from 'bcrypt';
import config from '../../../config';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../shared/pagination';
import { paginationHelper } from '../../../helpers/paginationHelpers';
const createUser = async (userData: User): Promise<User> => {
  const isExist = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User already exist!');
  }
  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );
  userData.isPasswordReset = false;
  const result = await prisma.user.create({ data: userData });
  return result;
};

const getAllFromDb = async (
  filters: {
    searchTerm?: string;
    fullName?: string;
  },
  options: IPaginationOptions
): Promise<User[]> => {
  const { searchTerm } = filters;
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const result = await prisma.user.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              fullName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              contactNo: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
    },
    include: {
      bookings: true,
      reviewAndRatings: true,
    },
    take: size,
    skip,
    orderBy:
      sortBy && sortBy
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: 'desc' },
  });

  const total = await prisma.user.count();

  return {
    meta: {
      page,
      size,
      total,
    },
    data: result,
  };
};

const getByIdFromDb = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const deleteByIdFromDb = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateByIdFromDb = async (id: string, payload: User): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const UserService = {
  createUser,
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
};
