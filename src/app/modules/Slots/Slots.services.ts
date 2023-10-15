/* eslint-disable @typescript-eslint/no-explicit-any */
import { Slots } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createTimeSlot = async (timeSlot: Slots): Promise<Slots> => {
  const result = await prisma.slots.create({
    data: timeSlot,
  });
  return result;
};

const getAllTimeSlots = async (): Promise<Slots[] | any> => {
  const result = await prisma.slots.findMany();
  return result;
};

const getSingleTimeSlot = async (id: string): Promise<Slots | null> => {
  const result = await prisma.slots.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateTimeSlot = async (id: string, timeSlot: Slots): Promise<Slots> => {
  const result = await prisma.slots.update({
    where: {
      id: id,
    },
    data: timeSlot,
  });
  return result;
};

const deleteTimeSlot = async (id: string): Promise<Slots> => {
  const result = await prisma.slots.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const TimeSlotsServices = {
  createTimeSlot,
  getAllTimeSlots,
  getSingleTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};
