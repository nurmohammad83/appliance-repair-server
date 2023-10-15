import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import tryAsync from '../../../shared/tryAsync';
import { PaymentServices } from './payment.service';
import { Request, Response } from 'express';

const createPayment = tryAsync(async (req: Request, res: Response) => {
  const result = await PaymentServices.createPayment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    success: true,
    data: result,
  });
});
const getAllPayments = tryAsync(async (req: Request, res: Response) => {
  const result = await PaymentServices.getAllPayments();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    success: true,
    data: result,
  });
});
const getSinglePayment = tryAsync(async (req: Request, res: Response) => {
  const result = await PaymentServices.getSinglePayment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    success: true,
    data: result,
  });
});
const updatePayment = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...paymentData } = req.body;
  const result = await PaymentServices.updatePayment(id, paymentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    success: true,
    data: result,
  });
});
const deletePayment = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentServices.deletePayment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    success: true,
    data: result,
  });
});

export const paymentController = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
