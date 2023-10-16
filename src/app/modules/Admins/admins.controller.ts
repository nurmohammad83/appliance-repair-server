import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import tryAsync from '../../../shared/tryAsync';
import sendResponse from '../../../shared/sendResponse';
import { adminServices } from './admins.services';

const createAdmin = tryAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
  const result = await adminServices.createAdmin(adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Admin create successfully',
    success: true,
    data: result,
  });
});

const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admins = await adminServices.getAllAdmins();
    res.status(200).json({
      status: 'success',
      message: 'Admins fetched successfully',
      data: admins.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAdmin = tryAsync(async (req: Request, res: Response) => {
  const result = await adminServices.getAllAdmins();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Admin fetched successfully',
    success: true,
    data: result,
  });
});

const updateAdmin = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...adminData } = req.body;
  const result = await adminServices.updateAdmin(id, adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Admin update successfully',
    success: true,
    data: result,
  });
});

const deleteAdmin = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminServices.deleteAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Admin delete successfully',
    success: true,
    data: result,
  });
});

export const adminController = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
