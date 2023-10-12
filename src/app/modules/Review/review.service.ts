import { ReviewAndRating } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (
  data: ReviewAndRating
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.create({
    data,
  });
  return result;
};

const getAllFromDb = async (): Promise<ReviewAndRating[] | null> => {
  const result = await prisma.reviewAndRating.findMany({
    include: {
      service: true,
      user: true,
    },
  });
  return result;
};

const getByIdFromDb = async (id: string): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
    include: {
      service: true,
      user: true,
    },
  });
  return result;
};
const deleteByIdFromDb = async (
  id: string
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateByIdFromDb = async (
  id: string,
  payload: ReviewAndRating
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const ReviewService = {
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
  insertIntoDb,
};
