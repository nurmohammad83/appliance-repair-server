import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDb = async (data: Category): Promise<Category | null> => {
  const isExist = await prisma.category.findFirst({
    where: {
      title: data.title,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category already exist!');
  }
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllFromDb = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany({
    include: {
      services: true,
    },
  });
  return result;
};

const getByIdFromDb = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });
  return result;
};

const deleteByIdFromDb = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateByIdFromDb = async (
  id: string,
  payload: Category
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const CategoryService = {
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
  insertIntoDb,
};
