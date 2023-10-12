import { Booking } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (bookingData: Booking): Promise<Booking> => {
  const result = await prisma.booking.create({
    data: bookingData,
    include: {
      service: true,
      user: true,
    },
  });
  return result;
};

const getAllFromDb = async (): Promise<Booking[] | null> => {
  const result = await prisma.booking.findMany({
    include: {
      service: true,
      user: true,
    },
  });
  return result;
};

const getByIdFromDb = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
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
const deleteByIdFromDb = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateByIdFromDb = async (
  id: string,
  payload: Booking
): Promise<Booking | null> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const BookingService = {
  insertIntoDb,
  getAllFromDb,
  getByIdFromDb,
  deleteByIdFromDb,
  updateByIdFromDb,
};
