/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDb = async (
  userId: string,
  serviceId: string,
  date: string,
  slotId: string
): Promise<any> => {
  const isExist = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service  not exist');
  }

  const isSlotExit = await prisma.booking.findFirst({
    where: {
      date,
      service: {
        id: isExist.id,
      },
      slotId,
    },
  });

  if (isSlotExit) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This slot is already exist');
  }

  const bookingData = await prisma.$transaction(async transactionClient => {
    const booking = await transactionClient.booking.create({
      data: {
        date,
        userId,
        slotId,
        serviceId,
      },
    });

    const payment = await transactionClient.payment.create({
      data: {
        amount: isExist.price,
        paymentStatus: 'pending',
        bookingId: booking.id,
      },
    });

    return {
      booking: booking,
      payment: payment,
    };
  });

  return bookingData;
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
