import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { UserData } from './user.interface';

const getAllFromDb = async (): Promise<UserData[] | null> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

const getByIdFromDb = async (id: string): Promise<UserData | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};
const deleteByIdFromDb = async (id: string): Promise<UserData | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

const updateByIdFromDb = async (
  id: string,
  payload: User
): Promise<UserData | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

export const UserService = {
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
};
