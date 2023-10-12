import { Booking } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (bookingData: Booking): Promise<Booking> => {
  const result = await prisma.booking.create({
    data: bookingData,
  });
  return result;
};

export const BookingService = { insertIntoDb };
