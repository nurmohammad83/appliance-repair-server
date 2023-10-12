import { Request, Response } from 'express';

import httpStatus from 'http-status';
import tryAsync from '../../../shared/tryAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';

const getAllFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    success: true,
    data: result,
  });
});

const getByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await UserService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User fetched successfully',
    success: true,
    data: result,
  });
});

const updateByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await UserService.updateByIdFromDb(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    success: true,
    data: result,
  });
});

const deleteByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users deleted successfully',
    success: true,
    data: result,
  });
});

export const UserController = {
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
};
