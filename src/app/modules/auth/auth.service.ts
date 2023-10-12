/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import httpStatus from 'http-status';
import ApiError from '../../../Errors/ApiError';
import config from '../../../config';

const loginUser = async (payload: any): Promise<any> => {
  const { email, password }: { email: string; password: string } = payload;

  let isUserExist: any;
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!admin && !user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (admin || user) {
    isUserExist = admin || user;
  }

  const isMatchPass = await bcrypt.compare(password, isUserExist?.password);
  if (isUserExist?.password && !isMatchPass) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Incorrect password!');
  }
  const payloadData = {
    email: isUserExist!.email,
    role: isUserExist!.role,
    phoneNumber: isUserExist!.phoneNumber,
    fullName: isUserExist!.fullName,
  };

  //   create token
  const accessToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Token is required');
  }

  const decodedToken = jwtHelpers.decodeToken(token);
  const { email, role, phoneNumber, fullName } = decodedToken;
  if (!email || !role || !phoneNumber || !fullName) {
    throw new Error('Invalid token');
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!admin && !user) {
    throw new Error('User does not exist');
  }
  const payloadData = {
    email: email,
    role: role,
    phoneNumber: phoneNumber,
    fullName: fullName,
  };
  const newAccessToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};
export const authServices = { loginUser, refreshToken };
