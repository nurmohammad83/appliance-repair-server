import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: Category): Promise<Category | null> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllFromDb = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany();
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
